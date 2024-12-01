import { NextResponse } from 'next/server'
import { LastFMResponse } from '@/types/lastfm'

const API_KEY = process.env.LASTFM_API_KEY
const API_BASE_URL = 'http://ws.audioscrobbler.com/2.0/'

export async function GET(request: Request) {
  if (!API_KEY) {
    return NextResponse.json({ error: 'LastFM API key not configured' }, { status: 500 })
  }

  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')
  const size = searchParams.get('size')
  const duration = searchParams.get('duration')

  if (!username || !size || !duration) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
  }

  const [rows, cols] = size.split('x').map(Number)
  const limit = rows * cols

  const method = 'user.gettopalbums'

  const url = `${API_BASE_URL}?method=${method}&user=${username}&period=${duration}&limit=${limit}&api_key=${API_KEY}&format=json`

  try {
    const response = await fetch(url)
    const data = await response.json() as LastFMResponse;

    if (data.error === 6) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (!data.topalbums.album || data.topalbums.album.length === 0) {
      return NextResponse.json({ error: 'No albums found for this time period' }, { status: 404 })
    }

    const items = data.topalbums.album.map((album) => ({
      name: album.name,
      artist: album.artist,
      image: album.image,
      playcount: album.playcount
    }))
    return NextResponse.json(items)
  } catch (error) {
    console.error('Error fetching data from LastFM API:', error)
    return NextResponse.json({ error: 'Failed to fetch data from LastFM API' }, { status: 500 })
  }
}

