interface MonthlyData {
    month: string;
    electricity: number;
    gas: number;
    water: number;
    total: number;
}

interface HourlyData {
    hour: string;
    consumption: number;
}

interface ApplianceData {
    name: string;
    value: number;
}

export const useProps = () => {
    // Data
    const monthlyData: MonthlyData[] = [
        { month: 'Jan', electricity: 320, gas: 240, water: 180, total: 740 },
        { month: 'Feb', electricity: 300, gas: 230, water: 170, total: 700 },
        { month: 'Mar', electricity: 280, gas: 220, water: 160, total: 660 },
        { month: 'Apr', electricity: 250, gas: 200, water: 150, total: 600 },
        { month: 'May', electricity: 230, gas: 180, water: 140, total: 550 },
        { month: 'Jun', electricity: 220, gas: 150, water: 150, total: 520 },
        { month: 'Jul', electricity: 240, gas: 130, water: 160, total: 530 },
        { month: 'Aug', electricity: 250, gas: 120, water: 170, total: 540 },
        { month: 'Sep', electricity: 270, gas: 140, water: 150, total: 560 },
        { month: 'Oct', electricity: 290, gas: 160, water: 160, total: 610 },
        { month: 'Nov', electricity: 310, gas: 190, water: 170, total: 670 },
        { month: 'Dec', electricity: 330, gas: 230, water: 180, total: 740 }
    ];

    const hourlyData: HourlyData[] = [
        { hour: '00:00', consumption: 2.1 },
        { hour: '02:00', consumption: 1.8 },
        { hour: '04:00', consumption: 1.5 },
        { hour: '06:00', consumption: 2.2 },
        { hour: '08:00', consumption: 3.5 },
        { hour: '10:00', consumption: 3.2 },
        { hour: '12:00', consumption: 3.8 },
        { hour: '14:00', consumption: 3.7 },
        { hour: '16:00', consumption: 3.9 },
        { hour: '18:00', consumption: 4.2 },
        { hour: '20:00', consumption: 4.8 },
        { hour: '22:00', consumption: 3.1 }
    ];

    const applianceData: ApplianceData[] = [
        { name: 'HVAC', value: 42 },
        { name: 'Water Heater', value: 14 },
        { name: 'Refrigerator', value: 8 },
        { name: 'Lighting', value: 7 },
        { name: 'Washer/Dryer', value: 6 },
        { name: 'Electronics', value: 5 },
        { name: 'Dishwasher', value: 4 },
        { name: 'Other', value: 14 }
    ];

    const COLORS: string[] = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

    // Computed values
    const currentMonthData: MonthlyData = monthlyData[monthlyData.length - 1];
    const totalEnergyConsumption: number = currentMonthData.total;
    const ytdConsumption: number = monthlyData.reduce((sum, month) => sum + month.total, 0);
    const peakHourData: HourlyData = hourlyData.reduce(
        (max, hour) => hour.consumption > max.consumption ? hour : max,
        hourlyData[0]
    );
    const avgDailyConsumption: number = totalEnergyConsumption / 30; // Assuming 30 days in the month

    return {
        props: {
            // Your props definition here if needed
        },
        // Return all the data and computed values
        monthlyData,
        hourlyData,
        applianceData,
        COLORS,
        currentMonthData,
        totalEnergyConsumption,
        ytdConsumption,
        peakHourData,
        avgDailyConsumption,
        selected: 'overview' as string
    };
};