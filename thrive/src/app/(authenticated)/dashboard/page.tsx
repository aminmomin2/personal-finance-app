"use client"

import { useState, useEffect } from "react"
import { 
  EllipsisVertical, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar,
  ChevronDown,
  Download,
  Plus,
  Filter,
  Search,
  CreditCard,
  Wallet,
  PiggyBank,
  BarChart3,
  LineChart,
  PieChart,
  Settings,
  Bell,
  Target,
  Trophy,
  Sparkles,
  ChevronRight,
  PartyPopper,
  Star,
  Medal,
  Gift,
  Crown,
  Zap,
  Heart,
  Award
} from "lucide-react"
import { NetWorth } from "../../components/NetWorth"
import { Spending } from "../../components/Spending"
import dynamic from 'next/dynamic'

// Dynamically import Confetti to avoid SSR issues
const ReactConfetti = dynamic(() => import('react-confetti'), {
  ssr: false
})

// Achievement types for different celebrations
type Achievement = {
  type: 'savings' | 'budget' | 'streak' | 'milestone' | 'challenge';
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("This Month")
  const [activeTab, setActiveTab] = useState("overview")
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  // Check for monthly goals achievement
  useEffect(() => {
    const checkMonthlyGoals = () => {
      const today = new Date()
      const isFirstDayOfMonth = today.getDate() === 1
      
      if (!isFirstDayOfMonth) return

      // Example goals to check
      const goals = {
        savingsRate: {
          current: 45.2, // This would come from your actual data
          target: 40,
          met: false
        },
        budgetAdherence: {
          current: 95, // Percentage of staying within budget
          target: 90,
          met: false
        },
        netWorthGrowth: {
          current: 5.2, // Percentage growth
          target: 5,
          met: false
        }
      }

      // Check if all goals are met
      goals.savingsRate.met = goals.savingsRate.current >= goals.savingsRate.target
      goals.budgetAdherence.met = goals.budgetAdherence.current >= goals.budgetAdherence.target
      goals.netWorthGrowth.met = goals.netWorthGrowth.current >= goals.netWorthGrowth.target

      const allGoalsMet = Object.values(goals).every(goal => goal.met)

      if (allGoalsMet) {
        setShowConfetti(true)
        
        // Play subtle celebration sound
        const audio = new Audio('/sounds/achievement.mp3')
        audio.volume = 0.3
        audio.play().catch(() => {}) // Ignore autoplay restrictions
      }
    }

    checkMonthlyGoals()
  }, [])

  // Handle window resize for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="min-h-screen bg-[var(--color-bg-light)]">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <ReactConfetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={200}
            gravity={0.3}
            initialVelocityY={5}
            tweenDuration={10000}
            colors={[
              '#FFD700', // Gold
              '#FFA500', // Orange
              '#FF69B4', // Pink
              '#87CEEB', // Sky Blue
              '#98FB98', // Light Green
              '#DDA0DD', // Plum
              '#F0E68C'  // Khaki
            ]}
            style={{
              opacity: 0.8,
              mixBlendMode: 'screen'
            }}
            confettiSource={{
              x: 0,
              y: 0,
              w: windowSize.width,
              h: 0
            }}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-5 h-5 text-[var(--color-primary)] animate-pulse" />
            <h2 className="text-lg font-medium text-[var(--color-text-dark)]">You're on a roll!</h2>
          </div>
          <p className="text-[var(--color-text-dark)]/60">You've saved 15% more than last month. Keep up the great work!</p>
        </div>

        {/* Quick Actions with Visual Hierarchy */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-[var(--border-color-light)] p-6 shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-[var(--color-text-dark)]/60">Total Balance</p>
                <p className="text-2xl font-semibold text-[var(--color-text-dark)]">$24,500.00</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-[var(--color-success)]">
              <ArrowUpRight className="w-4 h-4" />
              <span>+2.5% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[var(--border-color-light)] p-6 shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-success)] to-[var(--color-success-dark)] flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-[var(--color-text-dark)]/60">Monthly Income</p>
                <p className="text-2xl font-semibold text-[var(--color-text-dark)]">$8,240.00</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-[var(--color-success)]">
              <ArrowUpRight className="w-4 h-4" />
              <span>+5.2% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[var(--border-color-light)] p-6 shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-danger)] to-[var(--color-danger-dark)] flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <PiggyBank className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-[var(--color-text-dark)]/60">Monthly Expenses</p>
                <p className="text-2xl font-semibold text-[var(--color-text-dark)]">$4,520.00</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-[var(--color-danger)]">
              <ArrowDownRight className="w-4 h-4" />
              <span>+1.2% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[var(--border-color-light)] p-6 shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-warning)] to-[var(--color-warning-dark)] flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-[var(--color-text-dark)]/60">Savings Rate</p>
                <p className="text-2xl font-semibold text-[var(--color-text-dark)]">45.2%</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-[var(--color-success)]">
              <ArrowUpRight className="w-4 h-4" />
              <span>+3.1% from last month</span>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Main Content */}
          <div className="col-span-8 space-y-6">
            {/* Net Worth Card with Enhanced Visuals */}
            <div className="bg-white rounded-2xl border border-[var(--border-color-light)] p-6 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-medium text-[var(--color-text-dark)]">Net Worth</h2>
                  <p className="text-sm text-[var(--color-text-dark)]/60 mt-1">Your total financial position over time</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-[var(--color-bg-light)] rounded-lg transition-colors duration-200">
                    <Download className="w-5 h-5 text-[var(--color-text-dark)]/60" />
                  </button>
                  <button className="p-2 hover:bg-[var(--color-bg-light)] rounded-lg transition-colors duration-200">
                    <EllipsisVertical className="w-5 h-5 text-[var(--color-text-dark)]/60" />
                  </button>
                </div>
              </div>
              <div className="h-[400px]">
                <NetWorth />
              </div>
            </div>

            {/* Recent Transactions with Enhanced Interaction */}
            <div className="bg-white rounded-2xl border border-[var(--border-color-light)] p-6 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-medium text-[var(--color-text-dark)]">Recent Transactions</h2>
                  <p className="text-sm text-[var(--color-text-dark)]/60 mt-1">Your latest financial activities</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-dark)]/40" />
                    <input
                      type="text"
                      placeholder="Search transactions..."
                      className="pl-9 pr-4 py-2 text-sm border border-[var(--border-color-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                    />
                  </div>
                  <button className="p-2 hover:bg-[var(--color-bg-light)] rounded-lg transition-colors duration-200">
                    <Filter className="w-5 h-5 text-[var(--color-text-dark)]/60" />
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((_, index) => (
                  <div key={index} className="flex items-center justify-between p-4 hover:bg-[var(--color-bg-light)] rounded-xl transition-all duration-200 group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <TrendingUp className="w-6 h-6 text-[var(--color-primary)]" />
                      </div>
                      <div>
                        <p className="font-medium text-[var(--color-text-dark)]">Grocery Shopping</p>
                        <p className="text-sm text-[var(--color-text-dark)]/60">Walmart • Today at 2:30 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-[var(--color-danger)]">-$45.20</span>
                      <div className="px-2 py-1 bg-[var(--color-danger)]/10 rounded-lg">
                        <span className="text-xs text-[var(--color-danger)]">Food</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-3 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors duration-200 flex items-center justify-center gap-2 group">
                View All Transactions
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="col-span-4 space-y-6">
            {/* Spending Overview with Enhanced Visuals */}
            <div className="bg-white rounded-2xl border border-[var(--border-color-light)] p-6 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-medium text-[var(--color-text-dark)]">Spending Overview</h2>
                  <p className="text-sm text-[var(--color-text-dark)]/60 mt-1">This month's expenses breakdown</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-[var(--color-bg-light)] rounded-lg transition-colors duration-200">
                    <PieChart className="w-5 h-5 text-[var(--color-text-dark)]/60" />
                  </button>
                  <button className="p-2 hover:bg-[var(--color-bg-light)] rounded-lg transition-colors duration-200">
                    <LineChart className="w-5 h-5 text-[var(--color-text-dark)]/60" />
                  </button>
                </div>
              </div>
              <div className="h-[400px]">
                <Spending />
              </div>
            </div>

            {/* Budget Progress with Visual Feedback */}
            <div className="bg-white rounded-2xl border border-[var(--border-color-light)] p-6 shadow-sm hover:shadow-md transition-all duration-200">
              <h2 className="text-lg font-medium text-[var(--color-text-dark)] mb-6">Budget Progress</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-[var(--color-text-dark)]/60">Food & Dining</span>
                    <span className="text-sm font-medium text-[var(--color-text-dark)]">$450 / $600</span>
                  </div>
                  <div className="h-2 bg-[var(--color-bg-light)] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-full transition-all duration-500" style={{ width: '75%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-[var(--color-text-dark)]/60">Transportation</span>
                    <span className="text-sm font-medium text-[var(--color-text-dark)]">$280 / $400</span>
                  </div>
                  <div className="h-2 bg-[var(--color-bg-light)] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[var(--color-success)] to-[var(--color-success-dark)] rounded-full transition-all duration-500" style={{ width: '70%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-[var(--color-text-dark)]/60">Entertainment</span>
                    <span className="text-sm font-medium text-[var(--color-text-dark)]">$320 / $300</span>
                  </div>
                  <div className="h-2 bg-[var(--color-bg-light)] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[var(--color-danger)] to-[var(--color-danger-dark)] rounded-full transition-all duration-500" style={{ width: '106%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions with Enhanced Interactivity */}
            <div className="bg-white rounded-2xl border border-[var(--border-color-light)] p-6 shadow-sm hover:shadow-md transition-all duration-200">
              <h2 className="text-lg font-medium text-[var(--color-text-dark)] mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center justify-center p-4 bg-[var(--color-bg-light)] rounded-xl hover:bg-[var(--color-primary)]/10 transition-all duration-200 group">
                  <Plus className="w-6 h-6 text-[var(--color-primary)] mb-2 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm font-medium text-[var(--color-text-dark)]">Add Transaction</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-[var(--color-bg-light)] rounded-xl hover:bg-[var(--color-primary)]/10 transition-all duration-200 group">
                  <Download className="w-6 h-6 text-[var(--color-primary)] mb-2 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm font-medium text-[var(--color-text-dark)]">Export Data</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-[var(--color-bg-light)] rounded-xl hover:bg-[var(--color-primary)]/10 transition-all duration-200 group">
                  <BarChart3 className="w-6 h-6 text-[var(--color-primary)] mb-2 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm font-medium text-[var(--color-text-dark)]">View Reports</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-[var(--color-bg-light)] rounded-xl hover:bg-[var(--color-primary)]/10 transition-all duration-200 group">
                  <Settings className="w-6 h-6 text-[var(--color-primary)] mb-2 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm font-medium text-[var(--color-text-dark)]">Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
