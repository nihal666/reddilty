"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SquareArrowOutUpRight } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import React, { useState } from "react";
import axios from "axios";

interface Post {
  created_utc: number;
  score: number;
  num_comments: number;
  title: string;
  subreddit: string;
  author: string;
}

interface DayPostCount {
  day: string;
  postCount: number;
}

interface HourPostCount {
  hourSlot: string;
  postCount: number;
}

const Page: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [postsByDay, setPostsByDay] = useState<DayPostCount[]>([]);
  const [postsByHour, setPostsByHour] = useState<HourPostCount[]>([]);
  const [topPosts, setTopPosts] = useState<Post[]>([]);

  const handleOnClick = async () => {
    try {
      const response = await axios.get(
        "https://435f97c9-f178-47dd-82d0-c4ea04488e80-00-141lqd8ngjwl.sisko.replit.dev/?initialPath=%2F&id=%3Ar57%3A"
      ); // Replace with your API endpoint

      setData(response.data);
      processPostData(response.data.total_submissions);
    } catch (error) {
      console.error("Error fetching data from API", error);
    }
  };

  const processPostData = (submissions: Post[]) => {
    processPostDataByDay(submissions);
    processPostDataByHour(submissions);
    processTopPosts(submissions);
  };

  const processPostDataByDay = (submissions: Post[]) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const postCounts: DayPostCount[] = daysOfWeek.map((day) => ({ day, postCount: 0 }));

    submissions.forEach((post) => {
      const postDate = new Date(post.created_utc * 1000);
      const dayIndex = postDate.getDay();
      postCounts[dayIndex].postCount += 1;
    });

    setPostsByDay(postCounts);
  };

  const processPostDataByHour = (submissions: Post[]) => {
    const hourSlots: HourPostCount[] = Array.from({ length: 24 }, (_, i) => ({
      hourSlot: `${i}:00`,
      postCount: 0,
    }));

    submissions.forEach((post) => {
      const postDate = new Date(post.created_utc * 1000);
      const hourIndex = postDate.getHours();
      hourSlots[hourIndex].postCount += 1;
    });

    setPostsByHour(hourSlots);
  };

  const processTopPosts = (submissions: Post[]) => {
    const topPostsData: Post[] = submissions
      .map((post) => ({
        ...post,
        totalScore: post.score + post.num_comments,
      }))
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, 10);

    setTopPosts(topPostsData);
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <div>
          <p className="text-2xl font-bold">Redditor Analysis</p>
          <p className="text-lg text-gray-600">Discover how other redditors are using Reddit</p>
        </div>
        <div className="mt-6">
          <div className="flex items-center">
            <span className="mr-2 text-gray-400">u/</span>
            <Input className="flex-1 p-2 mb-4" />
          </div>
          <div className="flex gap-4">
            <Button onClick={handleOnClick} className="flex-1 px-4 py-2">Search</Button>
            <Button className="flex-1 px-4 py-2 flex items-center justify-center">
              View on Reddit <SquareArrowOutUpRight className="ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-5 rounded-lg mb-6 flex flex-col gap-3">
        <p className="text-md">1 <span className="text-gray-400">followers</span></p>
        <p className="text-md">1 <span className="text-gray-400">link karma</span></p>
        <p className="text-md">0 <span className="text-gray-400">comment karma</span></p>
        <p className="text-md">Sep. 18, 2022 <span className="text-gray-400">created</span></p>
        <p className="text-sm text-gray-400">Analytics pulled from the last 2 submissions from u/Tough-Character-7489 starting Nov. 22, 2023.</p>
      </div>

      <div className="mb-10 overflow-auto">
        <div className="mb-6">
          <p className="text-xl font-bold">Posts by Day</p>
          <p className="text-md text-gray-600">Which days does author submit Reddit posts?</p>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={postsByDay}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="postCount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="overflow-auto">
        <div className="mb-6">
          <p className="text-xl font-bold">Posts by Hour</p>
          <p className="text-md text-gray-600">Which hours does author submit Reddit posts?</p>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={postsByHour}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hourSlot" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="postCount" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="overflow-auto mb-10">
        <div className="my-5">
          <p className="text-xl font-bold">Top Posts</p>
        </div>
        <div className="flex flex-col gap-3">
          {topPosts.map((post, index) => (
            <div key={index} className="py-3 px-4 border-2 rounded-lg">
              <p className="text-lg font-bold text-blue-400">{`#${index + 1} - ${post.title}`}</p>
              <p className="text-sm text-gray-400">{`Post to r/${post.subreddit} from u/${post.author} • ${new Date(post.created_utc * 1000).toLocaleString()}`}</p>
              <p className="text-sm text-gray-400">{`${post.score} upvotes • ${post.num_comments} comments`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;