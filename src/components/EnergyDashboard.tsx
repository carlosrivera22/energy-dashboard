'use client';

import { useProps } from '@/features/dasboard/useProps';
import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EnergyDashboard = () => {
    const { totalEnergyConsumption, ytdConsumption, peakHourData, avgDailyConsumption, monthlyData, currentMonthData, hourlyData, COLORS } = useProps();

    // Local state for UI enhancements
    const [selected, setSelected] = useState('overview');
    const [darkMode, setDarkMode] = useState(false);
    const [animateStats, setAnimateStats] = useState(false);

    // Previous month comparison data
    const prevMonthData = monthlyData[monthlyData.length - 2] || { total: 0 };
    const consumptionChange = prevMonthData.total ?
        ((totalEnergyConsumption - prevMonthData.total) / prevMonthData.total * 100).toFixed(1) : '0.0';

    // Theme-based style classes
    const bgClass = darkMode ? 'bg-gray-900' : 'bg-gray-100';
    const cardBgClass = darkMode ? 'bg-gray-800' : 'bg-white';
    const textClass = darkMode ? 'text-gray-100' : 'text-gray-800';
    const textSecondaryClass = darkMode ? 'text-gray-300' : 'text-gray-600';
    const borderClass = darkMode ? 'border-gray-700' : 'border-gray-200';

    // Animate stats when tab changes
    useEffect(() => {
        setAnimateStats(true);
        const timer = setTimeout(() => setAnimateStats(false), 1000);
        return () => clearTimeout(timer);
    }, [selected]);

    return (
        <div className={`${bgClass} p-6 shadow-xl mx-auto transition-colors duration-300`}>
            {/* Header with Dark Mode Toggle */}
            <div className="flex justify-between items-center mb-6">
                <h1 className={`text-3xl font-bold ${textClass} transition-colors duration-300`}>
                    Energy Consumption Dashboard
                </h1>
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-yellow-200'}`}
                >
                    {darkMode ? '☀️' : '🌙'}
                </button>
            </div>

            {/* Quick Stats - Enhanced with animations and comparison */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className={`${cardBgClass} p-5 rounded-lg shadow transition-all duration-500 transform ${animateStats ? 'scale-105' : ''}`}>
                    <h3 className={`text-lg font-semibold ${textSecondaryClass}`}>Current Month</h3>
                    <p className="text-3xl font-bold text-blue-600">{totalEnergyConsumption} kWh</p>
                    <div className={`mt-2 text-sm ${Number(consumptionChange) > 0 ? 'text-red-500' : 'text-green-500'}`}>
                        {Number(consumptionChange) > 0 ? '↑' : '↓'} {Math.abs(Number(consumptionChange))}% from last month
                    </div>
                </div>
                <div className={`${cardBgClass} p-5 rounded-lg shadow transition-all duration-500 transform ${animateStats ? 'scale-105 delay-100' : ''}`}>
                    <h3 className={`text-lg font-semibold ${textSecondaryClass}`}>Year-to-Date</h3>
                    <p className="text-3xl font-bold text-green-600">{ytdConsumption} kWh</p>
                    <div className="mt-2 text-sm text-gray-500">
                        Avg. {(ytdConsumption / monthlyData.length).toFixed(0)} kWh/month
                    </div>
                </div>
                <div className={`${cardBgClass} p-5 rounded-lg shadow transition-all duration-500 transform ${animateStats ? 'scale-105 delay-200' : ''}`}>
                    <h3 className={`text-lg font-semibold ${textSecondaryClass}`}>Peak Hour</h3>
                    <p className="text-3xl font-bold text-amber-600">{peakHourData.hour}</p>
                    <div className="mt-2 text-sm text-gray-500">
                        {peakHourData.consumption} kWh consumed
                    </div>
                </div>
                <div className={`${cardBgClass} p-5 rounded-lg shadow transition-all duration-500 transform ${animateStats ? 'scale-105 delay-300' : ''}`}>
                    <h3 className={`text-lg font-semibold ${textSecondaryClass}`}>Daily Average</h3>
                    <p className="text-3xl font-bold text-purple-600">{avgDailyConsumption.toFixed(1)} kWh</p>
                    <div className="mt-2 text-sm text-gray-500">
                        ≈ ${(avgDailyConsumption * 0.12).toFixed(2)}/day
                    </div>
                </div>
            </div>

            {/* Navigation Tabs - Enhanced with pill design */}
            <div className={`flex flex-wrap mb-6 p-1 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                {['overview', 'monthly', 'hourly'].map((tab) => (
                    <button
                        key={tab}
                        className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 capitalize mr-2 ${selected === tab
                            ? `${darkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-600 text-white'} shadow-md`
                            : `${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-300'}`
                            }`}
                        onClick={() => setSelected(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Main Content Area */}
            <div className={`${cardBgClass} p-6 rounded-lg shadow-lg transition-colors duration-300`}>
                {selected === 'overview' && (
                    <div>
                        <h2 className={`text-xl font-semibold mb-6 ${textClass}`}>Energy Consumption Overview</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="h-72">
                                <h3 className={`text-lg font-medium mb-3 ${textSecondaryClass}`}>Monthly Consumption Trend</h3>
                                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} h-[calc(100%-2rem)]`}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={monthlyData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                                            <XAxis dataKey="month" stroke={darkMode ? "#9ca3af" : "#6b7280"} />
                                            <YAxis stroke={darkMode ? "#9ca3af" : "#6b7280"} />
                                            <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1f2937' : '#ffffff', borderColor: darkMode ? '#374151' : '#e5e7eb' }} />
                                            <Legend />
                                            <Line
                                                type="monotone"
                                                dataKey="total"
                                                name="Total Energy"
                                                stroke={darkMode ? "#60a5fa" : "#3b82f6"}
                                                strokeWidth={3}
                                                dot={{ r: 4 }}
                                                activeDot={{ r: 8, strokeWidth: 2 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            <div className="h-72">
                                <h3 className={`text-lg font-medium mb-3 ${textSecondaryClass}`}>Current Month Energy Mix</h3>
                                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} h-[calc(100%-2rem)]`}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={[
                                                    { name: 'Electricity', value: currentMonthData.electricity },
                                                    { name: 'Gas', value: currentMonthData.gas },
                                                    { name: 'Water', value: currentMonthData.water }
                                                ]}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {[0, 1, 2].map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* Energy Saving Recommendations Card */}
                        <div className={`mt-8 p-4 rounded-lg ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-blue-50 border border-blue-100'}`}>
                            <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>Energy Saving Recommendations</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                <div className={`p-3 rounded ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-sm flex items-start`}>
                                    <div className={`mr-3 p-2 rounded-full ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700'}`}>💡</div>
                                    <div>
                                        <h4 className={`font-semibold ${textClass}`}>LED Lighting</h4>
                                        <p className={`text-sm ${textSecondaryClass}`}>Switch to LED bulbs to save up to 7% on your bill</p>
                                    </div>
                                </div>
                                <div className={`p-3 rounded ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-sm flex items-start`}>
                                    <div className={`mr-3 p-2 rounded-full ${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-700'}`}>🌡️</div>
                                    <div>
                                        <h4 className={`font-semibold ${textClass}`}>Smart Thermostat</h4>
                                        <p className={`text-sm ${textSecondaryClass}`}>Optimize HVAC usage to reduce your largest energy cost</p>
                                    </div>
                                </div>
                                <div className={`p-3 rounded ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-sm flex items-start`}>
                                    <div className={`mr-3 p-2 rounded-full ${darkMode ? 'bg-amber-900 text-amber-200' : 'bg-amber-100 text-amber-700'}`}>🔌</div>
                                    <div>
                                        <h4 className={`font-semibold ${textClass}`}>Standby Power</h4>
                                        <p className={`text-sm ${textSecondaryClass}`}>Unplug electronics when not in use to save ~5% energy</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {selected === 'monthly' && (
                    <div>
                        <h2 className={`text-xl font-semibold mb-6 ${textClass}`}>Monthly Energy Trends</h2>
                        <div className="h-96">
                            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} h-full`}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={monthlyData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                                        <XAxis dataKey="month" stroke={darkMode ? "#9ca3af" : "#6b7280"} />
                                        <YAxis stroke={darkMode ? "#9ca3af" : "#6b7280"} />
                                        <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1f2937' : '#ffffff', borderColor: darkMode ? '#374151' : '#e5e7eb' }} />
                                        <Legend />
                                        <Bar dataKey="electricity" fill="#0088FE" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="gas" fill="#00C49F" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="water" fill="#FFBB28" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="mt-8 h-96">
                            <h3 className={`text-lg font-medium mb-3 ${textSecondaryClass}`}>Cumulative Consumption</h3>
                            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} h-[calc(100%-2rem)]`}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={monthlyData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                                        <XAxis dataKey="month" stroke={darkMode ? "#9ca3af" : "#6b7280"} />
                                        <YAxis stroke={darkMode ? "#9ca3af" : "#6b7280"} />
                                        <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1f2937' : '#ffffff', borderColor: darkMode ? '#374151' : '#e5e7eb' }} />
                                        <Legend />
                                        <defs>
                                            <linearGradient id="colorElectricity" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#0088FE" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#0088FE" stopOpacity={0.2} />
                                            </linearGradient>
                                            <linearGradient id="colorGas" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#00C49F" stopOpacity={0.2} />
                                            </linearGradient>
                                            <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#FFBB28" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#FFBB28" stopOpacity={0.2} />
                                            </linearGradient>
                                        </defs>
                                        <Area type="monotone" dataKey="electricity" stackId="1" stroke="#0088FE" fill="url(#colorElectricity)" />
                                        <Area type="monotone" dataKey="gas" stackId="1" stroke="#00C49F" fill="url(#colorGas)" />
                                        <Area type="monotone" dataKey="water" stackId="1" stroke="#FFBB28" fill="url(#colorWater)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Monthly Insights Panel */}
                        <div className={`mt-8 p-5 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} border ${borderClass}`}>
                            <h3 className={`text-lg font-medium mb-4 ${textClass}`}>Monthly Insights</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className={`font-semibold mb-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>Seasonal Patterns</h4>
                                    <ul className={`space-y-2 ${textSecondaryClass}`}>
                                        <li className="flex items-start">
                                            <span className="mr-2">•</span>
                                            <span>Winter months (Jan, Dec) show highest consumption due to heating needs</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2">•</span>
                                            <span>Summer months show moderate increase due to cooling requirements</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2">•</span>
                                            <span>Spring (Apr, May) shows lowest overall energy consumption</span>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className={`font-semibold mb-2 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>Utility Breakdown</h4>
                                    <ul className={`space-y-2 ${textSecondaryClass}`}>
                                        <li className="flex items-start">
                                            <span className="mr-2">•</span>
                                            <span>Electricity remains relatively constant year-round</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2">•</span>
                                            <span>Gas usage varies most significantly with season</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2">•</span>
                                            <span>Water usage increases slightly during summer months</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {selected === 'hourly' && (
                    <div>
                        <h2 className={`text-xl font-semibold mb-6 ${textClass}`}>Hourly Energy Usage</h2>
                        <div className="h-96">
                            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} h-[calc(100%-2rem)]`}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={hourlyData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                                        <XAxis dataKey="hour" stroke={darkMode ? "#9ca3af" : "#6b7280"} />
                                        <YAxis stroke={darkMode ? "#9ca3af" : "#6b7280"} />
                                        <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1f2937' : '#ffffff', borderColor: darkMode ? '#374151' : '#e5e7eb' }} />
                                        <Legend />
                                        <defs>
                                            <linearGradient id="colorConsumption" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor={darkMode ? "#1d4ed8" : "#3b82f6"} stopOpacity={0.8} />
                                                <stop offset="95%" stopColor={darkMode ? "#1e40af" : "#60a5fa"} stopOpacity={0.2} />
                                            </linearGradient>
                                        </defs>
                                        <Area
                                            type="monotone"
                                            dataKey="consumption"
                                            stroke={darkMode ? "#60a5fa" : "#3b82f6"}
                                            fill="url(#colorConsumption)"
                                            activeDot={{ r: 8, strokeWidth: 2 }}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                            {/* Peak Usage Analysis Card */}
                            <div className={`p-5 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} border ${borderClass}`}>
                                <h3 className={`text-lg font-medium mb-4 ${textClass}`}>Peak Usage Analysis</h3>
                                <div className={`p-4 rounded-lg mb-4 ${darkMode ? 'bg-blue-900 bg-opacity-50' : 'bg-blue-50'} border ${darkMode ? 'border-blue-800' : 'border-blue-100'}`}>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className={`font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>Peak Time</p>
                                            <p className="text-2xl font-bold">{peakHourData.hour}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className={`font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>Consumption</p>
                                            <p className="text-2xl font-bold">{peakHourData.consumption} kWh</p>
                                        </div>
                                    </div>
                                </div>
                                <p className={`${textSecondaryClass}`}>Your peak energy usage occurs in the evening when most household activities are taking place. Consider shifting some high-energy tasks to off-peak hours to reduce costs.</p>
                            </div>

                            {/* Hourly Insights Card */}
                            <div className={`p-5 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} border ${borderClass}`}>
                                <h3 className={`text-lg font-medium mb-4 ${textClass}`}>Hourly Insights</h3>
                                <ul className={`space-y-3 ${textSecondaryClass}`}>
                                    <li className="flex items-start">
                                        <div className={`mr-3 p-1 rounded-full ${darkMode ? 'bg-amber-900 text-amber-200' : 'bg-amber-100 text-amber-700'}`}>
                                            ⚡
                                        </div>
                                        <span>Peak consumption (6-10 PM) accounts for ~30% of daily usage</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className={`mr-3 p-1 rounded-full ${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-700'}`}>
                                            🛌
                                        </div>
                                        <span>Lowest consumption is during early morning hours (2-4 AM)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className={`mr-3 p-1 rounded-full ${darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-700'}`}>
                                            💰
                                        </div>
                                        <span>Shifting just 10% of peak usage to off-peak could save ~$15/month</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnergyDashboard;