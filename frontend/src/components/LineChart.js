import React, { useEffect, useState, useRef } from 'react';
import { Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale, Title } from 'chart.js';
import { fetchTransactions, fetchCategories } from './../services/apiService';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Legend } from 'chart.js';

const LineChart = () => {
    const canvasRef = useRef(null);
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState({});
    let chartInstance = useRef(null);

    useEffect(() => {
        Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Title, Legend, ChartDataLabels);

        fetchTransactions()
            .then(data => setTransactions(data));

        fetchCategories()
            .then(data => {
                const categoryMap = data.reduce((map, category) => {
                    map[category.id] = category.name;
                    return map;
                }, {});
                setCategories(categoryMap);
            });
    }, []);

    useEffect(() => {
        if (transactions.length > 0 && Object.keys(categories).length > 0) {
            const chartData = aggregateDataForAllMonths(transactions, categories);

            if (!chartInstance.current) {
                const ctx = canvasRef.current.getContext('2d');
                chartInstance.current = new Chart(ctx, {
                    type: 'line',
                    data: chartData,
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        },
                        plugins: {
                            legend: {
                                display: true,
                                position: 'top',

                            }
                        }
                    }
                });
            } else {
                chartInstance.current.data = chartData;
                chartInstance.current.update();
            }
        }
    }, [transactions, categories]);

    const getRandomColor = () => {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return `rgb(${r}, ${g}, ${b})`;
    };

    const aggregateDataForAllMonths = (transactions, categories) => {
        const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'long' }));
        const categoryData = {};

        // Initialize category data
        Object.keys(categories).forEach(catId => {
            categoryData[catId] = Array(12).fill(0);
        });

        // Aggregate data
        transactions.forEach(t => {
            const date = new Date(t.transaction_date);
            const monthIndex = date.getMonth();
            const catId = t.category_id.toString();
            categoryData[catId][monthIndex] += parseFloat(t.amount);
        });

        const datasets = Object.keys(categoryData).map(catId => {
            const color = getRandomColor();
            return {
                label: categories[catId],
                data: categoryData[catId],
                fill: false,
                borderColor: color,
                tension: 0.1
            };
        });

        return {
            labels: months,
            datasets: datasets
        };
    };


    return (
        <div>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

export default LineChart;
