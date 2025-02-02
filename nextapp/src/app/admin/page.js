'use client'
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function AdminDashboard() {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedOccupation, setSelectedOccupation] = useState('all');
  const [selectedEducation, setSelectedEducation] = useState('all');
  const [statsData, setStatsData] = useState(null);

  useEffect(() => {
    fetchStats();
  }, [selectedAgeGroup, selectedGender, selectedOccupation, selectedEducation]);

  const fetchStats = async () => {
    const response = await fetch(
      `/api/admin/stats?ageGroup=${selectedAgeGroup}&gender=${selectedGender}&occupation=${selectedOccupation}&education=${selectedEducation}`
    );
    const data = await response.json();
    setStatsData(data);
  };

  const userChartConfig = {
    series: statsData?.userStats?.map(stat => stat.count) || [],
    options: {
      chart: { type: 'pie' },
      labels: statsData?.userStats?.map(stat => stat._id) || [],
      title: { 
        text: 'User Demographics',
        align: 'center',
        style: { fontSize: '18px', fontWeight: 600 }
      },
      colors: ['#403cd5', '#6761ff', '#8b87ff'], // Different shades of purple
      fill: {
        opacity: 1
      }
    }
  };

  const occupationChartConfig = {
    series: [{
      name: 'Occupation Distribution',
      data: statsData?.occupationStats?.map(stat => stat.count) || []
    }],
    options: {
      chart: {
        type: 'radar',
        toolbar: {
          show: false
        }
      },
      title: {
        text: 'Occupation Distribution',
        align: 'center',
        style: { fontSize: '18px', fontWeight: 600 }
      },
      xaxis: {
        categories: [
          'Student',
          'Businessman',
          'Engineer',
          'Doctor',
          'Accountant',
          'Others'
        ].map(cat => cat.charAt(0).toUpperCase() + cat.slice(1))
      },
      colors: ['#403cd5'],
      markers: {
        size: 4,
        colors: ['#403cd5'],
        strokeColors: '#fff',
        strokeWidth: 2
      },
      fill: {
        opacity: 0.7
      }
    }
  };

  const recommendedPolicyConfig = {
    series: [{
      name: 'Recommendations',
      data: statsData?.recommendationStats?.map(stat => stat.count) || []
    }],
    options: {
      chart: { type: 'line' },
      xaxis: {
        categories: statsData?.recommendationStats?.map(stat => stat._id) || []
      },
      title: { 
        text: 'Policy Recommendations by Category',
        align: 'center',
        style: { fontSize: '18px', fontWeight: 600 }
      },
      colors: ['#403cd5'],
      stroke: {
        curve: 'smooth',
        width: 3
      },
      fill: {
        opacity: 1
      }
    }
  };

  const votingCategoriesConfig = {
    series: [{
      name: 'Policies',
      data: statsData?.votingPoliciesStats?.map(stat => stat.count) || []
    }],
    options: {
      chart: { type: 'bar' },
      xaxis: {
        categories: statsData?.votingPoliciesStats?.map(stat => stat._id) || []
      },
      title: { 
        text: 'Voting Policies Distribution',
        align: 'center',
        style: { fontSize: '18px', fontWeight: 600 }
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: '60%',
        }
      },
      colors: ['#403cd5'],
      fill: {
        opacity: 1
      }
    }
  };

  const votingStatsConfig = {
    series: [{
      name: 'Yes Votes',
      data: statsData?.policyVoteStats?.map(stat => stat.yesVotes) || []
    }, {
      name: 'No Votes',
      data: statsData?.policyVoteStats?.map(stat => stat.noVotes) || []
    }],
    options: {
      chart: { 
        type: 'bar',
        stacked: false
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 4,
          dataLabels: {
            position: 'top'
          }
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val;
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: statsData?.policyVoteStats?.map(stat => stat.title) || [],
        labels: {
          rotate: -45,
          trim: true,
          maxHeight: 120
        }
      },
      yaxis: {
        title: {
          text: 'Number of Votes'
        }
      },
      title: { 
        text: 'Policy Voting Results',
        align: 'center',
        style: { fontSize: '18px', fontWeight: 600 }
      },
      colors: ['#403cd5', '#6761ff'], // Two shades of purple for yes/no votes
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top'
      }
    }
  };

  const HeatmapLayer = () => {
    const map = useMap();
    
    useEffect(() => {
      if (statsData?.locationData) {
        const points = statsData.locationData.map(loc => [
          loc._id.lat,
          loc._id.lng,
          loc.count * 10 // Increase intensity multiplier
        ]);
        
        const heatLayer = L.heatLayer(points, {
          radius: 30, // Increased radius
          blur: 20, // Increased blur
          maxZoom: 10,
          minOpacity: 0.4,
          gradient: {
            0.2: '#e6e5ff',
            0.4: '#8b87ff',
            0.6: '#6761ff',
            0.8: '#403cd5',
            1.0: '#2a27a5'
          }
        });
        
        heatLayer.addTo(map);
        return () => map.removeLayer(heatLayer);
      }
    }, [map, statsData]);
    
    return null;
  };

  return (
    <div className="min-h-screen pt-24 bg-[#403cd5] p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#f8f9fa]">Admin Dashboard</h1>
        
        <div className="flex flex-wrap gap-4">
          <select
            value={selectedAgeGroup}
            onChange={(e) => setSelectedAgeGroup(e.target.value)}
            className="p-2 border rounded bg-white"
          >
            <option value="all">All Ages</option>
            <option value="18-25">18-25</option>
            <option value="26-35">26-35</option>
            <option value="36-50">36-50</option>
            <option value="50+">50+</option>
          </select>

          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            className="p-2 border rounded bg-white"
          >
            <option value="all">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <select
            value={selectedOccupation}
            onChange={(e) => setSelectedOccupation(e.target.value)}
            className="p-2 border rounded bg-white"
          >
            <option value="all">All Occupations</option>
            <option value="student">Student</option>
            <option value="businessman">Businessman</option>
            <option value="engineer">Engineer</option>
            <option value="doctor">Doctor</option>
            <option value="accountant">Accountant</option>
            <option value="others">Others</option>
          </select>

          <select
            value={selectedEducation}
            onChange={(e) => setSelectedEducation(e.target.value)}
            className="p-2 border rounded bg-white"
          >
            <option value="all">All Education</option>
            <option value="tenth">10th Standard</option>
            <option value="twelfth">12th Standard</option>
            <option value="undergraduate">Undergraduate</option>
            <option value="postgraduate">Postgraduate</option>
            <option value="doctorate">Doctorate</option>
            <option value="others">Others</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Demographics Section */}
        <div className="col-span-12 md:col-span-5 bg-white p-6 rounded-lg shadow-md">
          <Chart
            options={userChartConfig.options}
            series={userChartConfig.series}
            type="pie"
            height={400}
          />
        </div>

        {/* Occupation Section */}
        <div className="col-span-12 md:col-span-7 bg-white p-6 rounded-lg shadow-md">
          <Chart
            options={occupationChartConfig.options}
            series={occupationChartConfig.series}
            type="radar"
            height={400}
          />
        </div>

        {/* Voting Categories and Policy Recommendations side by side */}
        <div className="col-span-12 md:col-span-7 bg-white p-6 rounded-lg shadow-md">
          <Chart
            options={votingCategoriesConfig.options}
            series={votingCategoriesConfig.series}
            type="bar"
            height={400}
          />
        </div>

        <div className="col-span-12 md:col-span-5 bg-white p-6 rounded-lg shadow-md">
          <Chart
            options={recommendedPolicyConfig.options}
            series={recommendedPolicyConfig.series}
            type="line"
            height={400}
          />
        </div>

        {/* Voting Results */}
        <div className="col-span-12 bg-white p-6 rounded-lg shadow-md">
          <Chart
            options={votingStatsConfig.options}
            series={votingStatsConfig.series}
            type="bar"
            height={400}
          />
        </div>

        {/* Heatmap - Moved to bottom */}
        <div className="col-span-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-[#403cd5] text-center">
            User Distribution Heatmap
          </h2>
          <div className="h-[500px] w-full"> {/* Increased height for better visibility */}
            <MapContainer
              center={[20.5937, 78.9629]}
              zoom={5}
              style={{ height: '100%', width: '100%' }}
              zoomControl={true}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <HeatmapLayer />
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}