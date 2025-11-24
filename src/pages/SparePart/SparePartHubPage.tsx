import React, { useState } from "react";
import {
  IconMapPin,
  IconFilter,
  IconSearch,
  IconX,
} from "@tabler/icons-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

// Data dummy untuk filter
const hubTypes = [
  { key: "parts", label: "Spare Parts Store", color: "text-yellow-400" },
  { key: "repair", label: "Independent Repair Shop", color: "text-blue-400" },
  { key: "ewaste", label: "E-Waste Drop-off Point", color: "text-red-400" },
];

// Dummy hub data
const mapHubs = [
  {
    id: 1,
    name: "EcoFix Workshop",
    type: "repair",
    address: "Jl. Sudirman 123",
    coords: [34.0522, -118.2437],
  },
  {
    id: 2,
    name: "ReUse Parts Store",
    type: "parts",
    address: "Jl. Thamrin 45",
    coords: [34.0532, -118.2537],
  },
];

export function SparePartHubPage() {
  const [activeFilters, setActiveFilters] = useState(["parts", "repair", "ewaste"]);
  const [selectedHub, setSelectedHub] = useState<any>(null);

  const toggleFilter = (key: string) => {
    setActiveFilters((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <Card className="w-full md:w-80 p-6 flex flex-col space-y-6 bg-gray-900 border-r border-white/10">
        <div className="flex items-center space-x-2 text-white text-2xl font-semibold">
          <IconFilter className="w-6 h-6 text-green-400" />
          <span>Filter Hubs</span>
        </div>

        {/* Search Bar */}
        <Input
          placeholder="Search by address or item..."
          className="bg-gray-800 text-white border border-white/10 pl-10"
          prefix={<IconSearch className="w-5 h-5 text-white/50" />}
        />

        {/* Filter Checkboxes */}
        <div className="space-y-3 mt-4">
          <p className="text-white/70 font-medium text-sm">Tipe Hub:</p>
          {hubTypes.map((type) => (
            <div key={type.key} className="flex items-center space-x-2">
              <Checkbox
                checked={activeFilters.includes(type.key)}
                onCheckedChange={() => toggleFilter(type.key)}
              />
              <span className={`text-white cursor-pointer ${type.color}`}>
                {type.label}
              </span>
            </div>
          ))}
        </div>

        {/* List Terdekat */}
        <ScrollArea className="flex-1 mt-4">
          <h3 className="text-white font-semibold mb-3">
            Terdekat ({mapHubs.length})
          </h3>
          <div className="space-y-2">
            {mapHubs.map((hub) => (
              <Card
                key={hub.id}
                className="bg-gray-800 border border-white/10 p-3 cursor-pointer hover:bg-gray-700 transition-colors"
                onClick={() => setSelectedHub(hub)}
              >
                <CardContent className="p-0">
                  <p className="font-medium text-white">{hub.name}</p>
                  <p className="text-sm text-white/70">{hub.address}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Map Area */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-black flex items-center justify-center text-white/50 text-2xl">
          <IconMapPin className="w-8 h-8 mr-2" />
          [Interactive Map Component Here]
        </div>

        {selectedHub && (
          <Card className="absolute bottom-4 right-4 w-80 p-4 bg-gray-900 border border-green-400 shadow-2xl transition-transform">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-white/70 hover:text-white"
              onClick={() => setSelectedHub(null)}
            >
              <IconX className="w-5 h-5" />
            </Button>
            <CardContent className="p-0">
              <h3 className="text-xl font-bold text-green-400">{selectedHub.name}</h3>
              <p className="text-sm text-white/80 mt-1">{selectedHub.address}</p>
              <p className="text-xs text-white/60 mt-2">
                Tipe: {hubTypes.find((t) => t.key === selectedHub.type)?.label}
              </p>
              <Button className="w-full mt-4 bg-green-400 text-black hover:bg-green-500">
                GO TO NAVIGATION
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
