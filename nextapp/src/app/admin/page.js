'use client'
import React from 'react';
import dynamic from 'next/dynamic';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const barData = {
  series: [{
    name: 'Sales',
    data: [12, 19, 3, 5, 2, 3]
  }],
  options: {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      }
    },
    xaxis: {
      categories: ['January', 'February', 'March', 'April', 'May', 'June'],
    },
    colors: ['#403cd5']
  }
};

const pieData = {
  series: [300, 50, 100],
  options: {
    chart: {
      type: 'pie',
    },
    labels: ['Red', 'Blue', 'Yellow'],
    colors: ['#403cd5', '#82ca9d', '#ffc658']
  }
};

const lineData = {
  series: [{
    name: 'Revenue',
    data: [65, 59, 80, 81, 56, 55]
  }],
  options: {
    chart: {
      type: 'line',
      height: 350,
      toolbar: {
        show: false
      }
    },
    xaxis: {
      categories: ['January', 'February', 'March', 'April', 'May', 'June'],
    },
    colors: ['#403cd5']
  }
};

const areaData = {
  series: [{
    name: 'Visitors',
    data: [31, 40, 28, 51, 42, 109, 100]
  }],
  options: {
    chart: {
      type: 'area',
      height: 350,
      toolbar: {
        show: false
      }
    },
    xaxis: {
      categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    },
    colors: ['#403cd5']
  }
};

const radarData = {
  series: [{
    name: 'Performance',
    data: [80, 50, 30, 40, 100, 20],
  }],
  options: {
    chart: {
      type: 'radar',
      height: 350,
      toolbar: {
        show: false
      }
    },
    xaxis: {
      categories: ['Metric1', 'Metric2', 'Metric3', 'Metric4', 'Metric5', 'Metric6'],
    },
    colors: ['#403cd5']
  }
};

const geoJsonData = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": { "name": "India" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [77.837451, 35.49401],
            [78.912269, 34.321936],
            [78.811086, 33.506198],
            [79.208892, 32.994394],
            [79.176129, 32.48378],
            [78.458446, 32.618164],
            [78.738894, 31.515906],
            [79.721367, 30.882715],
            [81.111256, 30.183481],
            [80.476721, 29.729865],
            [80.088425, 28.79447],
            [81.057203, 28.416095],
            [81.999987, 27.925479],
            [83.304249, 27.364506],
            [84.675018, 27.234901],
            [85.251779, 26.726198],
            [86.024393, 26.630985],
            [87.227472, 26.397898],
            [88.060238, 26.414615],
            [88.174804, 26.810405],
            [88.043133, 27.445819],
            [88.120441, 27.876542],
            [88.730326, 28.086865],
            [88.814248, 27.299316],
            [88.835643, 27.098966],
            [89.744528, 26.719403],
            [90.373275, 26.875724],
            [91.217513, 26.808648],
            [92.033484, 26.83831],
            [92.103712, 27.452614],
            [91.696657, 27.771742],
            [92.503119, 27.896876],
            [93.413348, 28.640629],
            [94.56599, 29.277438],
            [95.404802, 29.031717],
            [96.117679, 29.452802],
            [96.586591, 28.83098],
            [96.248833, 28.411031],
            [97.327114, 28.261583],
            [97.402561, 27.882536],
            [97.051989, 27.699059],
            [97.133999, 27.083774],
            [96.419366, 27.264589],
            [95.124768, 26.573572],
            [95.155153, 26.001307],
            [94.603249, 25.162495],
            [94.552658, 24.675238],
            [94.106742, 23.850741],
            [93.325188, 24.078556],
            [93.286327, 23.043658],
            [93.060294, 22.703111],
            [93.166128, 22.27846],
            [92.672721, 22.041239],
            [92.146035, 23.627499],
            [91.869928, 23.624346],
            [91.706475, 22.985264],
            [91.158963, 23.503527],
            [91.46773, 24.072639],
            [91.915093, 24.130414],
            [92.376201, 24.976693],
            [91.799596, 25.147432],
            [90.872211, 25.132601],
            [89.920693, 25.26975],
            [89.832481, 25.965082],
            [89.355094, 26.014407],
            [88.563049, 26.446526],
            [88.209789, 25.768066],
            [88.931554, 25.238692],
            [88.306373, 24.866079],
            [88.084422, 24.501657],
            [88.69994, 24.233715],
            [88.52977, 23.631142],
            [88.876312, 22.879146],
            [89.031961, 22.055708],
            [88.888766, 21.690588],
            [88.208497, 21.703172],
            [86.975704, 21.495562],
            [87.033169, 20.743308],
            [86.499351, 20.151638],
            [85.060266, 19.478579],
            [83.941006, 18.302009],
            [83.189217, 17.671221],
            [82.192792, 17.016636],
            [82.191242, 16.556664],
            [81.692719, 16.310219],
            [80.791999, 15.951972],
            [80.324896, 15.899185],
            [80.025069, 15.136415],
            [80.233273, 13.835771],
            [80.286294, 13.006261],
            [79.862547, 12.056215],
            [79.857999, 10.357275],
            [79.340511, 10.308854],
            [78.885345, 9.546136],
            [79.18972, 9.216544],
            [78.277941, 8.933047],
            [77.941165, 8.252959],
            [77.539898, 7.965535],
            [76.592979, 8.899276],
            [76.130061, 10.29963],
            [75.746467, 11.308251],
            [75.396101, 11.781245],
            [74.864816, 12.741936],
            [74.616717, 13.992583],
            [74.443859, 14.617222],
            [73.534199, 15.990652],
            [73.119909, 17.92857],
            [72.820909, 19.208234],
            [72.824475, 20.419503],
            [72.630533, 21.356009],
            [71.175273, 20.757441],
            [70.470459, 20.877331],
            [69.16413, 22.089298],
            [69.644928, 22.450775],
            [69.349597, 22.84318],
            [68.176645, 23.691965],
            [68.842599, 24.359134],
            [71.04324, 24.356524],
            [70.844699, 25.215102],
            [70.282873, 25.722229],
            [70.168927, 26.491872],
            [69.514393, 26.940966],
            [70.616496, 27.989196],
            [71.777666, 27.91318],
            [72.823752, 28.961592],
            [73.450638, 29.976413],
            [74.42138, 30.979815],
            [74.405929, 31.692639],
            [75.258642, 32.271105],
            [74.451559, 32.7649],
            [74.104294, 33.441473],
            [73.749948, 34.317699],
            [74.240203, 34.748887],
            [75.757061, 34.504923],
            [76.871722, 34.653544],
            [77.837451, 35.49401]
          ]
        ]
      }
    }
  ]
};

const heatmapPoints = [
  [28.7041, 77.1025, 0.5], // Delhi
  [19.0760, 72.8777, 0.5], // Mumbai
  [13.0827, 80.2707, 0.5], // Chennai
  [22.5726, 88.3639, 0.5], // Kolkata
  [12.9716, 77.5946, 0.5], // Bangalore
  [17.3850, 78.4867, 0.5], // Hyderabad
  [23.0225, 72.5714, 0.5], // Ahmedabad
  [26.9124, 75.7873, 0.5], // Jaipur
  [21.1702, 72.8311, 0.5], // Surat
  [19.9975, 73.7898, 0.5], // Nashik
];

const HeatmapLayer = () => {
  const map = useMap();
  React.useEffect(() => {
    const heatLayer = L.heatLayer(heatmapPoints, { radius: 25, blur: 15, maxZoom: 17 });
    heatLayer.addTo(map);
    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map]);
  return null;
};

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] p-8">
      <h1 className="text-3xl font-bold mb-8 text-[#403cd5]">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-[#403cd5]">Sales Bar Chart</h2>
          <Chart options={barData.options} series={barData.series} type="bar" height={350} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-[#403cd5]">Votes Pie Chart</h2>
          <Chart options={pieData.options} series={pieData.series} type="pie" height={350} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-[#403cd5]">Revenue Line Chart</h2>
          <Chart options={lineData.options} series={lineData.series} type="line" height={350} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-[#403cd5]">Visitors Area Chart</h2>
          <Chart options={areaData.options} series={areaData.series} type="area" height={350} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-[#403cd5]">Performance Radar Chart</h2>
          <Chart options={radarData.options} series={radarData.series} type="radar" height={350} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2 lg:col-span-3">
          <h2 className="text-xl font-semibold mb-4 text-[#403cd5]">Indian Map</h2>
          <MapContainer center={[20.5937, 78.9629]} zoom={4} style={{ height: '400px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <GeoJSON data={geoJsonData} style={{ fillColor: "#403cd5", weight: 2, color: "#403cd5", fillOpacity: 0.5 }} />
            <HeatmapLayer />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;