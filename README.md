# Last.fm Collage Generator

![screenshot](https://i.ibb.co/RPcngzG/Screenshot-2024-12-01-192621.png)

## Overview

A web application that generates music collages using your Last.fm listening data. Built with **Next.js**, **ShadCN**, and the **Last.fm API**.

## Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Last.fm account
- [Last.fm API key](https://www.last.fm/api/accounts)

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/marrrkkk/lastfm-collage-generator.git
   cd lastfm-collage-generator
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add:
   ```
   LASTFM_API_KEY=your_lastfm_api_key
   ```

## Running the Application

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.


## Contributing

Contributions are welcome! If you'd like to improve this project, feel free to fork the repository and open a pull request. Make sure to follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements

- [Last.fm](https://www.last.fm/)
- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)