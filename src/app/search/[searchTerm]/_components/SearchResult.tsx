/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";

import VideoCard from "@/components/HomeSection/VideoCard";
import SkeletonVideoCard from "@/components/HomeSection/VideoCardSkelaton";
import { useFetchApi } from "@/lib/utils/useFetchApi";
import { type Item } from "@/Types/TypesVideos";

const SearchResult = ({ searchTerm }: { searchTerm: string }) => {
  const [videos, setVideos] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const truncateSearchTerm = (term: string) => {
    const decodedTerm = decodeURIComponent(term).replace(/-/g, " ");
    return decodedTerm.length > 12
      ? `${decodedTerm.slice(0, 15)}...`
      : decodedTerm;
  };
  useEffect(() => {
    setLoading(true);
    useFetchApi(`search?part=snippet&q=${decodeURIComponent(searchTerm)}`).then(
      (data) => {
        if (data.error) {
          setError(data?.error);
          setVideos([]);
        } else {
          setError(null);
          setVideos(data?.items);
        }
        setLoading(false);
      }
    );
  }, [searchTerm]);

  return (
    <div className="mt-14 py-2 bg-primary text-primary-foreground min-h-screen p-4 overflow-hidden">
      <h1 className="lg:text-3xl font-bold py-5">
        Search Results For:{" "}
        <span className="text-destructive capitalize w-fit bg-green-400 text-white rounded-full px-2 text-xl py-1">
          {truncateSearchTerm(searchTerm)}
        </span>
      </h1>
      {error ? (
        <div className="text-destructive flex items-center justify-center m-auto lg:text-4xl text-center px-5">
          {error}
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i}>
              <SkeletonVideoCard />
            </div>
          ))}
          <div className="mb-5"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {videos?.map((item, i) => <VideoCard key={i} video={item} />)}
        </div>
      )}
    </div>
  );
};

export default SearchResult;
