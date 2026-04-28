import React, { useState, useEffect, act } from 'react';
import Spinner from '../../Components/common/Spinner';
import progressService from '../../services/progressService';
import toast from 'react-hot-toast';
import { FileText, BookOpen, BrainCircuit, TrendingUp, Clock } from 'lucide-react';

const DashboardPage = () => {

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const data = await progressService.getDashboardData();
                console.log('Data_getDashboardData:', data);

                setDashboardData(data.data);
            } catch (error) {
                toast.error('Failed to fetch dashboard data.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    if (!dashboardData || !dashboardData.overview) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-flex intems-center justify-center w-16 h-16 rounded-2xl bg-slate-100 mb-4">
                        <TrendingUp className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-600 text-sm">No dashboard data available.</p>
                </div>
            </div>
        );
    }

    const stats = [
        { 
            label: 'Total Documents',
            value: dashboardData.overview.totalDocuments,
            icon: FileText,
            gradient: 'from-blue-400 to-cyan-500',
            shadowColor: 'shadow-blue-500/25'
        },
        {
            label: 'Total Flashcards',
            value: dashboardData.overview.totalFlashcards,
            icon: BookOpen,
            gradient: 'from-purple-400 to-pink-500',
            shadowColor: 'shadow-purple-500/25'
        },
        {
            label: 'Total Quizzes',
            value: dashboardData.overview.totalQuizzes,
            icon: BrainCircuit,
            gradient: 'from-emerald-400 to-teal-500',
            shadowColor: 'shadow-emerald-500/25'
        }
    ];

    return (
        <div className="min-h-screen">
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] opacity-30 pointer-events-none" />

            <div className="relative max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-medium text-slate-900 tracking-tight mb-2">
                        Dashboard
                    </h1>
                    <p className="text-slate-500 text-sm">
                        Track your learning progress and activity
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
                    {stats.map((stat, index) => (
                        <div 
                            key={index}
                            className="group "
                        >
                            <div className="">
                                <span className="">
                                    {stat.label}
                                </span>
                                <div className={`w-11 h-11 rounded-xl bg-linear-to-br ${stat.gradient} shadow-lg ${stat.shadowColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                    <stat.icon className="" strokeWidth={2} />
                                </div>
                            </div>
                            <div className="">
                                {stat.value}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Activity Section */}
                <div className="">
                    <div className="">
                        <div className="">
                            <Clock className="" strokeWidth={2} />
                        </div>
                        <h3 className="">
                            Recent Activity
                        </h3>
                    </div>
                    
                    {dashboardData.recentActivity && (dashboardData.recentActivity.documents.length > 0 || dashboardData.recentActivity.quizzes.length > 0) ? (
                        <div className="">
                            {[
                                ...(dashboardData.recentActivity.documents ||[]).map(doc => ({
                                    id: doc._id,
                                    description: doc.title,
                                    timestamp: doc.lastAccessed,
                                    links: `/documents/${doc._id}`,
                                    type: 'Document'
                                })),
                                ...(dashboardData.recentActivity.quizzes || []).map(quiz => ({
                                    id: quiz._id,
                                    description: quiz.title,
                                    timestamp: quiz.lastAttempted,
                                    links: `/quizzes/${quiz._id}`,
                                    type: 'Quiz'
                                }))
                            ]
                            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                            .map((activity, index) => (
                                <div 
                                    key={activity.id || index}
                                    className=""
                                >
                                    <div className="">
                                        <div className="">
                                            <div className={`w-2 h-2 rounded-full ${
                                                activity.type === 'document'
                                                    ? 'bg-linear-to-r from-blue-400 to-cyan-500'
                                                    : 'bg-linear-to-r from-emerald-400 to-teal-500'
                                            }`} />
                                            <p className="">
                                                {activity.type === 'document' ? 'Accessed Document' : 'Attempted Quiz'}
                                                <span className="">{activity.description}</span>
                                            </p>
                                        </div>
                                        <p className="">
                                            {new Date(activity.timestamp).toLocaleString()}
                                        </p>
                                    </div>
                                    {activity.links && (
                                        <a
                                            href={activity.links}
                                            className=""
                                        >
                                            View
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="">
                            <div className="">
                                <Clock className="" />
                            </div>
                            <p className="">No recent activity yet.</p>
                            <p className="">Start learning to see your progress here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DashboardPage