"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Collage from "@/components/Collage";
import { CollageData } from '@/types/lastfm'

export default function CollageGenerator() {
  const [username, setUsername] = useState("");
  const [size, setSize] = useState("3x3");
  const [duration, setDuration] = useState("7day");
  const [showTitle, setShowTitle] = useState(false);
  const [showPlaycount, setShowPlaycount] = useState(false);
  const [collageData, setCollageData] = useState<CollageData[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    if (!username) return;

    setIsLoading(true);
    setError("");
    setCollageData(null);

    try {
      const response = await fetch(
        `/api/lastfm?username=${username}&size=${size}&duration=${duration}`
      );
      const data = await response.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      setCollageData(data);
    } catch {
      setError("Failed to fetch data from LastFM API");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (collageData) {
      fetchData();
    }
  }, [size, duration]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  };

  const handleDownload = () => {
    if (!collageData) return;

    const canvas = document.querySelector(
      ".collage-canvas"
    ) as HTMLCanvasElement;
    if (canvas) {
      const link = document.createElement("a");
      link.download = "lastfm_collage.png";
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-6 lg:space-y-0">
        <div className="lg:w-1/3">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-end space-x-2">
              <h1 className="text-3xl font-bold text-primary">Last.fm</h1>
              <span className="text-lg  font-semibold">Collage Generator</span>
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="size">Size</Label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3x3">3x3</SelectItem>
                  <SelectItem value="4x4">4x4</SelectItem>
                  <SelectItem value="5x5">5x5</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="duration">Duration</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7day">7 days</SelectItem>
                  <SelectItem value="1month">1 month</SelectItem>
                  <SelectItem value="3month">3 months</SelectItem>
                  <SelectItem value="6month">6 months</SelectItem>
                  <SelectItem value="12month">12 months</SelectItem>
                  <SelectItem value="overall">Overall</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="show-title"
                checked={showTitle}
                onCheckedChange={(checked: boolean) => setShowTitle(checked)}
              />
              <Label htmlFor="show-title">Show Title</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="show-playcount"
                checked={showPlaycount}
                onCheckedChange={(checked: boolean) =>
                  setShowPlaycount(checked)
                }
              />
              <Label htmlFor="show-playcount">Show Playcount</Label>
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Generating..." : "Generate Collage"}
            </Button>
          </form>
        </div>

        <div className="lg:w-2/3">
          <div className="border rounded-lg p-4 min-h-[300px] flex items-center justify-center">
            {error ? (
              <div className="text-destructive text-center">{error}</div>
            ) : collageData ? (
              <div className="space-y-4 w-full">
                <Collage
                  data={collageData}
                  size={size}
                  showTitle={showTitle}
                  showPlaycount={showPlaycount}
                />
                <Button onClick={handleDownload} className="w-full">
                  Download PNG
                </Button>
              </div>
            ) : (
              <div className="text-muted-foreground text-center">
                Enter your LastFM username to generate a collage
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
