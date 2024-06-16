// "use client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import axios from "axios";
// import { useState } from "react";
// import { HeatMapGrid } from "react-grid-heatmap";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
// } from "recharts";

// const yLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// const xLabels = [
//   "00:00-01:00",
//   "01:00-02:00",
//   "02:00-03:00",
//   "03:00-04:00",
//   "04:00-05:00",
//   "05:00-06:00",
//   "06:00-07:00",
//   "07:00-08:00",
//   "08:00-09:00",
//   "09:00-10:00",
//   "10:00-11:00",
//   "11:00-12:00",
//   "12:00-13:00",
//   "13:00-14:00",
//   "14:00-15:00",
//   "15:00-16:00",
//   "16:00-17:00",
//   "17:00-18:00",
//   "18:00-19:00",
//   "19:00-20:00",
//   "20:00-21:00",
//   "21:00-22:00",
//   "22:00-23:00",
//   "23:00-00:00",
// ];

// interface PostSchedulerProps {
//   day: string;
//   timeSlot: string;
// }

// const PostScheduler: React.FC<PostSchedulerProps> = ({ day, timeSlot }) => {
//   return (
//     <div className="flex flex-col items-center gap-3 py-4 px-8 border rounded-md">
//       <div className="flex flex-col gap-2 items-center">
//         <p className="text-lg font-bold">{day}</p>
//         <p className="text-md text-gray-600">{timeSlot}</p>
//       </div>
//       <Button className="mt-2 w-full">Schedule a Post</Button>
//     </div>
//   );
// };

// const App = () => {
//   const [data, setData] = useState<number[][]>([]);
//   const [bestTimes, setBestTimes] = useState([]);
//   const [postsPerDay, setPostsPerDay] = useState([]);
//   const [postsPerHour, setPostsPerHour] = useState([]);
//   const [frequentWords, setFrequentWords] = useState([]);

//   const calculateBestTimes = (weeklyEngagement) => {
//     return yLabels.map((day, dayIndex) => {
//       const maxEngagement = Math.max(...weeklyEngagement[dayIndex]);
//       const bestHour = weeklyEngagement[dayIndex].indexOf(maxEngagement);
//       return { day, timeSlot: xLabels[bestHour] };
//     });
//   };

//   const calculatePostsPerDay = (weeklyPosts) => {
//     return yLabels.map((day, dayIndex) => {
//       const totalPosts = weeklyPosts[dayIndex].reduce(
//         (acc, val) => acc + val,
//         0
//       );
//       return { day, totalPosts };
//     });
//   };

//   const calculatePostsPerHour = (weeklyPosts) => {
//     const postsPerHour = Array(24).fill(0);
//     weeklyPosts.forEach((dayPosts) => {
//       dayPosts.forEach((postCount, hour) => {
//         postsPerHour[hour] += postCount;
//       });
//     });
//     return xLabels.map((timeSlot, hour) => {
//       return { timeSlot, totalPosts: postsPerHour[hour] };
//     });
//   };

//   const calculateFrequentWords = (posts) => {
//     const wordCount = {};
//     posts.forEach((post) => {
//       const words = post.title.split(/\W+/);
//       words.forEach((word) => {
//         if (word) {
//           wordCount[word.toLowerCase()] =
//             (wordCount[word.toLowerCase()] || 0) + 1;
//         }
//       });
//     });
//     const sortedWords = Object.entries(wordCount)
//       .sort(([, a], [, b]) => b - a)
//       .slice(0, 10)
//       .map(([word]) => word);
//     return sortedWords;
//   };

//   const fetchHeatmapData = async () => {
//     try {
//       const response = await axios.get(
//         `https://435f97c9-f178-47dd-82d0-c4ea04488e80-00-141lqd8ngjwl.sisko.replit.dev/top_posts/wallstreetbets`
//       );
//       const topPosts = await response.data;

//       // Initialize a 2D array with 7 days and 24 hours each
//       const weeklyEngagement = Array.from({ length: 7 }, () =>
//         new Array(24).fill(0)
//       );
//       const weeklyPosts = Array.from({ length: 7 }, () =>
//         new Array(24).fill(0)
//       );

//       // Calculate engagement and post count for each post and add it to the corresponding day and hour
//       topPosts.forEach((post) => {
//         const engagement = post.score + post.num_comments;
//         const postDate = new Date(post.created_utc * 1000);
//         const postDay = postDate.getUTCDay(); // 0 (Sunday) to 6 (Saturday)
//         const postHour = postDate.getUTCHours();
//         weeklyEngagement[postDay][postHour] += engagement;
//         weeklyPosts[postDay][postHour] += 1;
//       });

//       setData(weeklyEngagement);
//       setBestTimes(calculateBestTimes(weeklyEngagement));
//       setPostsPerDay(calculatePostsPerDay(weeklyPosts));
//       setPostsPerHour(calculatePostsPerHour(weeklyPosts));
//       setFrequentWords(calculateFrequentWords(topPosts));
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setData([]);
//     }
//   };

//   console.log();

//   return (
//     <div className="p-8">
//       <div className="mb-6">
//         <div>
//           <div className="flex items-center w-full">
//             <span className="mr-2 text-gray-400">u/</span>
//             <Input className="flex-1 p-2 mb-4" />
//             <Button onClick={fetchHeatmapData}>Search</Button>
//           </div>
//         </div>
//         <div className="mb-6">
//           <p className="text-xl font-bold">
//             Best Times to Post to r/wallstreetbets
//           </p>
//           <p className="text-md text-gray-600">
//             Learn when posts get the most engagement in r/wallstreetbets.
//           </p>
//         </div>
//         <div style={{ width: "100%" }} className="overflow-auto pb-4 px-2">
//           <HeatMapGrid
//             data={data}
//             xLabels={xLabels}
//             yLabels={yLabels}
//             cellRender={(x, y, value) => (
//               <div title={`Pos(${x}, ${y}) = ${value}`}>{value}</div>
//             )}
//             xLabelsStyle={(index) => ({
//               color: "#777",
//               fontSize: ".7rem",
//               marginRight: "20px",
//             })}
//             yLabelsStyle={() => ({
//               fontSize: ".7rem",
//               textTransform: "uppercase",
//               color: "#777",
//             })}
//             cellStyle={(_x, _y, ratio) => ({
//               background: `rgb(12, 160, 44, ${ratio})`,
//               fontSize: ".8rem",
//               color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`,
//               marginRight: "20px",
//             })}
//             cellHeight="2rem"
//             xLabelsPos="left"
//             yLabelsPos="top"
//             onClick={(x, y) => alert(`Clicked (${x}, ${y})`)}
//             square
//           />
//         </div>
//       </div>
//       <div className="mb-6">
//         <p className="text-xl font-bold">Daily Recommendations</p>
//         <p className="text-md text-gray-600">
//           The best time to submit to r/wallstreetbets each day of the week.
//         </p>
//         <ul>
//           {bestTimes.map((time, index) => (
//             <div key={index} className="mt-3">
//               <PostScheduler day={time.day} timeSlot={time.timeSlot} />
//             </div>
//           ))}
//         </ul>
//       </div>
//       <div className="mb-6">
//         <p className="text-xl font-bold">Posts per Day</p>
//         <p className="text-md text-gray-600">
//           Total posts for each day of the week.
//         </p>
//         <div>
//           <ResponsiveContainer width="100%" height={400}>
//             <BarChart
//               width={500}
//               height={300}
//               data={postsPerDay}
//               margin={{
//                 top: 5,
//                 right: 30,
//                 left: 20,
//                 bottom: 5,
//               }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="day" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="totalPosts" fill="#8884d8" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//       <div className="mb-6">
//         <p className="text-xl font-bold">Posts per Hour</p>
//         <p className="text-md text-gray-600">
//           Total posts for each hour of the day.
//         </p>
//         <div>
//           <ResponsiveContainer width="100%" height={400}>
//             <LineChart
//               data={postsPerHour}
//               margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="timeSlot" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line
//                 type="monotone"
//                 dataKey="totalPosts"
//                 stroke="#8884d8"
//                 activeDot={{ r: 8 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//       <div className="mb-6">
//         <p className="text-xl font-bold">Most Frequent Words</p>
//         <p className="text-md text-gray-600">
//           Most frequent words used in the top posts.
//         </p>
//         <ul>
//           {frequentWords.map((word, index) => (
//             <li key={index}>{word}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default App;
import React from 'react'

const page = () => {
  return (
    <div>
      
    </div>
  )
}

export default page

