
import React from 'react';
import { X, Target, Users, Zap, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface PRDModalProps {
  onClose: () => void;
}

const PRDModal: React.FC<PRDModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <Card className="w-full max-w-4xl bg-white max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 sticky top-0 bg-white border-b">
          <CardTitle className="text-2xl font-bold text-gray-800">
            पैसा Tracker - Product Requirements Document (PRD)
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {/* Executive Summary */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-800">Executive Summary</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              पैसा Tracker is a comprehensive expense tracking application designed specifically for 
              budget-conscious individuals in tier-2 and tier-3 cities of India. The app helps users 
              track every penny spent by categorizing expenses into "Needs" and "Wants", enabling 
              better financial awareness and decision-making.
            </p>
          </section>

          <Separator />

          {/* Target Audience */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-800">Target Audience</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800">Primary Users</h4>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                  <li>Young professionals in tier-2/3 cities (22-35 years)</li>
                  <li>Middle-class families managing household expenses</li>
                  <li>Small business owners tracking personal finances</li>
                  <li>Students and recent graduates building financial habits</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800">User Characteristics</h4>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                  <li>Previously used Excel sheets or manual methods</li>
                  <li>Value every rupee and seek financial discipline</li>
                  <li>Need simple, intuitive tools without complexity</li>
                  <li>Prefer offline-first solutions with data privacy</li>
                </ul>
              </div>
            </div>
          </section>

          <Separator />

          {/* Key Features */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-orange-600" />
              <h3 className="text-xl font-semibold text-gray-800">Key Features (Version 1.0)</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-green-700">Needs Tracking</h4>
                  <p className="text-sm text-gray-600">Pre-populated essential categories like rent, utilities, groceries</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-orange-700">Wants Tracking</h4>
                  <p className="text-sm text-gray-600">Lifestyle expenses like dining out, entertainment, shopping</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-blue-700">Quick Entry</h4>
                  <p className="text-sm text-gray-600">Fast expense logging with amount, description, and category</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-purple-700">Visual Summaries</h4>
                  <p className="text-sm text-gray-600">Clear breakdown of spending patterns and category totals</p>
                </div>
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-semibold text-indigo-700">Local Storage</h4>
                  <p className="text-sm text-gray-600">Data stored locally for privacy and offline access</p>
                </div>
                <div className="border-l-4 border-teal-500 pl-4">
                  <h4 className="font-semibold text-teal-700">Mobile-First</h4>
                  <p className="text-sm text-gray-600">Responsive design optimized for mobile usage</p>
                </div>
              </div>
            </div>
          </section>

          <Separator />

          {/* Pre-defined Categories */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Pre-defined Categories</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Needs Categories
                </h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Rent/EMI</li>
                  <li>• Utilities (Electricity, Water, Gas)</li>
                  <li>• Groceries & Essential Food</li>
                  <li>• Transportation (Commute)</li>
                  <li>• Mobile/Internet Bills</li>
                  <li>• Insurance Premiums</li>
                  <li>• Medical/Healthcare</li>
                  <li>• Children Education</li>
                  <li>• Loan Payments</li>
                  <li>• Essential Clothing</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Wants Categories
                </h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Dining Out</li>
                  <li>• Entertainment</li>
                  <li>• Shopping (Non-essential)</li>
                  <li>• Travel/Vacation</li>
                  <li>• Hobbies</li>
                  <li>• Gadgets/Electronics</li>
                  <li>• Beauty/Personal Care</li>
                  <li>• Gifts</li>
                  <li>• Subscriptions (OTT, etc.)</li>
                  <li>• Other Wants</li>
                </ul>
              </div>
            </div>
          </section>

          <Separator />

          {/* Technical Specifications */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Technical Specifications</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800">Frontend</h4>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    <li>• React 18 with TypeScript</li>
                    <li>• Tailwind CSS for styling</li>
                    <li>• Shadcn/UI components</li>
                    <li>• Responsive design</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Data Storage</h4>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    <li>• Browser localStorage</li>
                    <li>• JSON format</li>
                    <li>• Client-side only</li>
                    <li>• No external dependencies</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <Separator />

          {/* Success Metrics */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Success Metrics</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">90%</div>
                <div className="text-sm text-gray-600">User retention after 1 week</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">5+</div>
                <div className="text-sm text-gray-600">Expenses logged per user/day</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-orange-600">30s</div>
                <div className="text-sm text-gray-600">Average time to log expense</div>
              </div>
            </div>
          </section>

          <Separator />

          {/* Future Roadmap */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Future Roadmap</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <strong>Version 2.0:</strong> Budget setting, spending limits, and alerts
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <strong>Version 3.0:</strong> Monthly/yearly reports and spending trends
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <strong>Version 4.0:</strong> Multi-language support (Hindi, regional languages)
                </div>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default PRDModal;
