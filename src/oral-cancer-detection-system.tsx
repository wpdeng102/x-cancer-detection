import React, { useState, useEffect } from 'react';
import { 
  Camera, Upload, User, FileText, AlertCircle, Check, Activity, FileBarChart, 
  HelpCircle, Settings, LogOut, Eye, EyeOff, Lock, Mail, Shield, Monitor,
  Clock, TrendingUp, Users, BarChart3, Search, Bell, Plus, ChevronRight,
  Download, Share, Calendar, MapPin, AlertTriangle, CheckCircle, Brain,
  Stethoscope, Zap, ArrowLeft
} from 'lucide-react';

const OralCancerDetectionSystem = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysisTab, setAnalysisTab] = useState('image');
  const [rtpcrData, setRtpcrData] = useState(null);
  const [rtpcrAnalysis, setRtpcrAnalysis] = useState(false);
  const [patientInfo, setPatientInfo] = useState({
    id: 'P-10429',
    name: 'John Anderson',
    age: 57,
    gender: 'Male',
    riskFactors: ['Tobacco use (25 years)', 'Alcohol consumption', 'Previous leukoplakia']
  });
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [showReport, setShowReport] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setCurrentPage('dashboard');
      setLoading(false);
    }, 1500);
  };

  const handleImageUpload = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedImage('/api/placeholder/600/400');
      setLoading(false);
    }, 1000);
  };

  const handleRtpcrUpload = () => {
    setLoading(true);
    setTimeout(() => {
      setRtpcrData({
        filename: 'patient_P-10429_rtpcr_results.csv',
        uploadTime: new Date().toLocaleString(),
        markers: {
          'CDKN2A': { value: 0.23, status: 'deleted', risk: 'high' },
          'TP53': { value: 0.89, status: 'mutated', risk: 'high' },
          'CCND1': { value: 2.45, status: 'amplified', risk: 'medium' },
          'PIK3CA': { value: 1.2, status: 'normal', risk: 'low' },
          'NOTCH1': { value: 0.8, status: 'normal', risk: 'low' }
        },
        overallRisk: 'high'
      });
      setRtpcrAnalysis(true);
      setLoading(false);
    }, 1500);
  };

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      setAnalysisComplete(true);
      setLoading(false);
      setCurrentPage('results');
    }, 2000);
  };

  const AnimatedCard = ({ children, delay = 0 }) => (
    <div 
      className="transform transition-all duration-500 ease-out opacity-0 translate-y-4"
      style={{
        animation: `slideUp 0.6s ease-out ${delay}s both`
      }}
    >
      {children}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );

  const PulsingDot = ({ color = "bg-blue-500" }) => (
    <div className={`w-2 h-2 ${color} rounded-full animate-pulse`}></div>
  );

  // Comprehensive Medical Report Component
  const MedicalReport = () => {
    const generateSurvivalPrediction = () => {
      if (!selectedImage && !rtpcrData) return null;
      
      // Calculate survival based on risk factors
      let baseYears = 8.5; // Average baseline for early detection
      
      if (selectedImage) baseYears -= 1.5; // High probability visual detection
      if (rtpcrData && rtpcrData.overallRisk === 'high') baseYears -= 2.0; // High molecular risk
      if (patientInfo.age > 60) baseYears -= 0.5; // Age factor
      if (patientInfo.riskFactors.some(factor => factor.includes('Tobacco'))) baseYears -= 1.0; // Smoking
      
      // Ensure minimum realistic range
      baseYears = Math.max(baseYears, 2.5);
      
      return {
        years: Math.round(baseYears * 10) / 10,
        range: `${Math.round((baseYears - 1) * 10) / 10} - ${Math.round((baseYears + 2) * 10) / 10}`,
        confidence: baseYears > 6 ? 'moderate' : baseYears > 4 ? 'guarded' : 'poor'
      };
    };

    const survivalPrediction = generateSurvivalPrediction();
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    const determineStage = () => {
      if (!selectedImage && !rtpcrData) return 'Unable to determine';
      
      if (selectedImage && rtpcrData) {
        if (rtpcrData.overallRisk === 'high') return 'T2N0M0 (Stage II-III)';
        return 'T1N0M0 (Stage I-II)';
      } else if (selectedImage) {
        return 'T1-2N0M0 (Clinical staging pending)';
      } else {
        return 'Molecular high-risk (Imaging required)';
      }
    };

    const getCancerType = () => {
      if (!rtpcrData) return 'Squamous Cell Carcinoma (presumptive)';
      
      const highRiskGenes = Object.entries(rtpcrData.markers)
        .filter(([gene, data]) => data.risk === 'high');
      
      if (highRiskGenes.length >= 2) {
        return 'Squamous Cell Carcinoma (molecularly confirmed)';
      }
      return 'Squamous Cell Carcinoma (high molecular risk)';
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-screen overflow-y-auto">
          <div className="p-8">
            {/* Report Header */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    DTx.AI ORAL CANCER DETECTION REPORT
                  </h1>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Report ID:</strong> OCR-{Date.now().toString().slice(-8)}</p>
                    <p><strong>Generated:</strong> {currentDate}</p>
                    <p><strong>Analyzing Physician:</strong> Dr. Wu</p>
                    <p><strong>Institution:</strong> DTx.AI Medical Center</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    Print Report
                  </button>
                  <button 
                    onClick={() => setShowReport(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>

            {/* Patient Information */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">PATIENT INFORMATION</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Patient ID</p>
                    <p className="font-medium">{patientInfo.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{patientInfo.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Age</p>
                    <p className="font-medium">{patientInfo.age} years</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Gender</p>
                    <p className="font-medium">{patientInfo.gender}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Risk Factors</p>
                  <div className="flex flex-wrap gap-2">
                    {patientInfo.riskFactors.map((factor, index) => (
                      <span key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">EXECUTIVE SUMMARY</h2>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-red-800 mb-2">PRIMARY FINDINGS</h3>
                    <ul className="space-y-1 text-sm text-red-700">
                      {selectedImage && <li>• High-probability malignant lesion detected (87%)</li>}
                      {rtpcrData && <li>• High-risk molecular profile confirmed</li>}
                      <li>• Tumor confirmation: <strong>POSITIVE</strong></li>
                      <li>• Cancer type: <strong>{getCancerType()}</strong></li>
                      <li>• Clinical stage: <strong>{determineStage()}</strong></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-800 mb-2">PROGNOSIS</h3>
                    {survivalPrediction && (
                      <div className="text-sm text-red-700">
                        <p><strong>5-year survival estimate:</strong> {survivalPrediction.years} years</p>
                        <p><strong>Range:</strong> {survivalPrediction.range} years</p>
                        <p><strong>Prognosis:</strong> {survivalPrediction.confidence}</p>
                        <p><strong>Urgency:</strong> Immediate intervention required</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Diagnostic Results */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">DIAGNOSTIC FINDINGS</h2>
              
              {selectedImage && (
                <div className="mb-4">
                  <h3 className="font-medium text-gray-800 mb-2">1. IMAGING ANALYSIS (AI-CNN)</h3>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-blue-900 mb-2">Detection Results</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Malignancy probability: <strong>87%</strong></li>
                          <li>• Confidence score: <strong>0.92 (High)</strong></li>
                          <li>• Tumor classification: <strong>Squamous Cell Carcinoma</strong></li>
                          <li>• Primary location: <strong>Lateral border of tongue</strong></li>
                          <li>• Lesion characteristics: Irregular borders, heterogeneous texture</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-900 mb-2">Technical Details</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Model: EfficientNet-B4</li>
                          <li>• Analysis date: {currentDate}</li>
                          <li>• Processing time: 2.3 seconds</li>
                          <li>• Image quality: Excellent</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {rtpcrData && (
                <div className="mb-4">
                  <h3 className="font-medium text-gray-800 mb-2">2. MOLECULAR ANALYSIS (RT-PCR)</h3>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-purple-900 mb-2">Gene Expression Profile</h4>
                        <div className="space-y-2">
                          {Object.entries(rtpcrData.markers).map(([gene, data]) => (
                            <div key={gene} className="flex justify-between text-sm">
                              <span className="text-purple-800">{gene}:</span>
                              <span className={`font-medium ${
                                data.risk === 'high' ? 'text-red-600' :
                                data.risk === 'medium' ? 'text-orange-600' :
                                'text-green-600'
                              }`}>
                                {data.status} ({data.value}) - {data.risk.toUpperCase()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-purple-900 mb-2">Clinical Significance</h4>
                        <ul className="text-sm text-purple-800 space-y-1">
                          <li>• Overall molecular risk: <strong className="text-red-600">HIGH</strong></li>
                          <li>• Tumor suppressor loss: CDKN2A, TP53</li>
                          <li>• Oncogene activation: CCND1</li>
                          <li>• Cancer type confirmed: <strong>Squamous Cell Carcinoma</strong></li>
                          <li>• Targetable mutations: Under evaluation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Clinical Assessment */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">CLINICAL ASSESSMENT</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-800 space-y-3">
                  <p>
                    <strong>Integrated Analysis:</strong> {selectedImage && rtpcrData 
                      ? 'Concordant findings from both imaging and molecular analysis strongly support the diagnosis of oral squamous cell carcinoma. The 87% probability from CNN analysis combined with high-risk molecular markers (CDKN2A deletion, TP53 mutation) provides robust evidence for malignancy.'
                      : selectedImage 
                      ? 'High-probability imaging findings (87%) indicate malignant transformation. The lesion morphology and location are characteristic of squamous cell carcinoma in a high-risk patient.'
                      : 'High-risk molecular profile with critical tumor suppressor gene alterations strongly suggests malignant transformation. Clinical correlation with imaging is recommended.'
                    }
                  </p>
                  
                  <p>
                    <strong>Risk Stratification:</strong> Patient presents with multiple high-risk factors including {patientInfo.age}-year age, extensive tobacco use history, and {selectedImage ? 'suspicious imaging findings' : ''} {rtpcrData ? 'high-risk molecular alterations' : ''}. The combination places patient in the highest risk category for aggressive oral cancer.
                  </p>

                  <p>
                    <strong>Staging Assessment:</strong> Based on available data, preliminary staging suggests {determineStage()}. {selectedImage ? 'Imaging shows localized disease without obvious nodal involvement.' : 'Clinical staging requires imaging assessment.'} Comprehensive staging workup including CT/MRI and possible PET scan is recommended.
                  </p>

                  {survivalPrediction && (
                    <p>
                      <strong>Prognosis:</strong> With appropriate treatment, the estimated 5-year survival is {survivalPrediction.years} years (range: {survivalPrediction.range}). Early intervention and multimodal therapy may significantly improve outcomes. Prognosis is classified as {survivalPrediction.confidence} based on current findings and patient factors.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Treatment Recommendations */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">TREATMENT RECOMMENDATIONS</h2>
              <div className="bg-yellow-50 rounded-lg p-4">
                <h3 className="font-medium text-yellow-900 mb-3">IMMEDIATE ACTIONS (24-48 hours)</h3>
                <ol className="list-decimal list-inside text-sm text-yellow-800 space-y-1 mb-4">
                  <li>Urgent tissue biopsy for histopathological confirmation</li>
                  <li>Multidisciplinary team consultation (oncology, surgery, radiation)</li>
                  <li>Comprehensive staging workup (CT/MRI head and neck)</li>
                  <li>Laboratory workup including CBC, comprehensive metabolic panel</li>
                </ol>
                
                <h3 className="font-medium text-yellow-900 mb-3">TREATMENT PLANNING (1-2 weeks)</h3>
                <ol className="list-decimal list-inside text-sm text-yellow-800 space-y-1 mb-4">
                  <li>Surgical planning with oral and maxillofacial surgeon</li>
                  <li>Radiation oncology consultation for adjuvant planning</li>
                  <li>Medical oncology evaluation for systemic therapy options</li>
                  <li>{rtpcrData ? 'Precision medicine panel for targeted therapy options' : 'Consider molecular profiling for targeted therapies'}</li>
                  <li>Nutritional assessment and dental evaluation</li>
                </ol>

                <h3 className="font-medium text-yellow-900 mb-3">MONITORING & FOLLOW-UP</h3>
                <ul className="list-disc list-inside text-sm text-yellow-800 space-y-1">
                  <li>Post-treatment surveillance every 3 months for 2 years</li>
                  <li>Annual imaging for recurrence monitoring</li>
                  <li>Quality of life assessment and rehabilitation services</li>
                  <li>Tobacco cessation counseling and support</li>
                </ul>
              </div>
            </div>

            {/* Report Footer */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-2 gap-6 text-sm text-gray-600">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">DISCLAIMER</h3>
                  <p>
                    This DTx.AI-generated report is intended for clinical decision support and should not replace 
                    professional medical judgment. All findings require histopathological confirmation and 
                    clinical correlation. Treatment decisions should be made in consultation with a 
                    multidisciplinary cancer care team.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">REPORT VALIDATION</h3>
                  <div className="space-y-1">
                    <p><strong>AI System:</strong> DTx.AI v2.1.0</p>
                    <p><strong>Validation ID:</strong> {Date.now().toString(16).toUpperCase()}</p>
                    <p><strong>Report Status:</strong> Validated</p>
                    <p><strong>Digital Signature:</strong> Dr. Wu - {currentDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Login Page
  const LoginPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-red-600 rounded-full opacity-10 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-md w-full">
        <AnimatedCard delay={0}>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg"></div>
                <PulsingDot color="bg-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DTx.AI
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>
        </AnimatedCard>

        <AnimatedCard delay={0.1}>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="doctor@hospital.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={20} className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? <EyeOff size={20} className="text-gray-400" /> : <Eye size={20} className="text-gray-400" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg transform hover:scale-105'
                } text-white flex items-center justify-center gap-2`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
                    Request Access
                  </a>
                </p>
              </div>
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard delay={0.2}>
          <div className="mt-8 bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center gap-3">
              <Shield size={24} className="text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Secure Medical Platform</p>
                <p className="text-xs text-gray-600">HIPAA compliant • End-to-end encrypted</p>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );

  // Sidebar Component
  const Sidebar = () => (
    <div className="w-64 bg-gray-800 h-screen text-white p-6 flex flex-col">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg"></div>
          <span className="text-xl font-bold">DTx.AI</span>
        </div>
        <p className="text-sm text-gray-400">Oral Cancer Detection System</p>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          {[
            { id: 'dashboard', icon: Monitor, label: 'Dashboard' },
            { id: 'upload', icon: Upload, label: 'New Analysis' },
            { id: 'results', icon: FileText, label: 'Results' },
            { id: 'patients', icon: Users, label: 'Patient Management' },
            { id: 'reports', icon: BarChart3, label: 'Analytics' }
          ].map(({ id, icon: Icon, label }) => (
            <li key={id}>
              <button 
                className={`flex items-center gap-3 p-3 w-full rounded-lg transition-all ${
                  currentPage === id ? 'bg-blue-700' : 'hover:bg-gray-700'
                }`}
                onClick={() => setCurrentPage(id)}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="pt-6 mt-6 border-t border-gray-700">
        <ul className="space-y-2">
          <li>
            <button className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-gray-700">
              <HelpCircle size={18} />
              <span>Help & Support</span>
            </button>
          </li>
          <li>
            <button className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-gray-700">
              <Settings size={18} />
              <span>Settings</span>
            </button>
          </li>
          <li>
            <button 
              className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-gray-700"
              onClick={() => {
                setIsLoggedIn(false);
                setCurrentPage('login');
                setAnalysisComplete(false);
                setSelectedImage(null);
                setRtpcrData(null);
              }}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );

  // Header Component
  const Header = () => (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {currentPage === 'dashboard' && 'Dashboard'}
            {currentPage === 'upload' && 'New Analysis'}
            {currentPage === 'results' && 'Analysis Results'}
            {currentPage === 'patients' && 'Patient Management'}
            {currentPage === 'reports' && 'Analytics & Reports'}
          </h1>
          <p className="text-gray-600">
            {currentPage === 'dashboard' && 'Welcome back, Dr. Wu'}
            {currentPage === 'upload' && 'Upload and analyze oral cavity images'}
            {currentPage === 'results' && 'Review detection results and clinical insights'}
            {currentPage === 'patients' && 'Manage patient records and history'}
            {currentPage === 'reports' && 'View system analytics and generate reports'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors relative">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
          </button>
          <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <Search size={20} className="text-gray-600" />
          </button>
          <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">Dr. Wu</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Dashboard Page
  const DashboardPage = () => (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <AnimatedCard delay={0}>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Good Morning, Dr. Wu</h2>
          <p className="text-gray-600">Ready to help patients today?</p>
        </AnimatedCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total Scans', value: '1,247', change: '+12%', icon: Camera, color: 'blue' },
          { title: 'High-Risk Cases', value: '89', change: '+5%', icon: AlertTriangle, color: 'red' },
          { title: 'Accuracy Rate', value: '97.3%', change: '+0.8%', icon: TrendingUp, color: 'green' },
          { title: 'Patients Served', value: '892', change: '+18%', icon: Users, color: 'purple' }
        ].map(({ title, value, change, icon: Icon, color }, index) => (
          <AnimatedCard key={title} delay={index * 0.1}>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg bg-${color}-100`}>
                  <Icon size={24} className={`text-${color}-600`} />
                </div>
                <span className="text-sm text-green-600 font-medium">{change}</span>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <p className="text-gray-600">{title}</p>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AnimatedCard delay={0.4}>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { patient: 'P-10429', action: 'High-risk detection', time: '5 min ago', status: 'urgent' },
                { patient: 'P-10430', action: 'Analysis completed', time: '12 min ago', status: 'completed' },
                { patient: 'P-10431', action: 'Report generated', time: '25 min ago', status: 'success' },
                { patient: 'P-10432', action: 'Pending review', time: '1 hour ago', status: 'pending' }
              ].map(({ patient, action, time, status }, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${
                    status === 'urgent' ? 'bg-red-500' :
                    status === 'completed' ? 'bg-blue-500' :
                    status === 'success' ? 'bg-green-500' : 'bg-orange-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{patient}</p>
                    <p className="text-sm text-gray-600">{action}</p>
                  </div>
                  <span className="text-xs text-gray-500">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard delay={0.5}>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-4">
              <button 
                onClick={() => setCurrentPage('upload')}
                className="w-full p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-3"
              >
                <Camera size={20} />
                <span className="font-medium">Start New Analysis</span>
                <ChevronRight size={20} className="ml-auto" />
              </button>
              <button 
                onClick={() => setCurrentPage('results')}
                className="w-full p-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all flex items-center gap-3"
              >
                <FileText size={20} />
                <span className="font-medium">Review Pending Results</span>
                <ChevronRight size={20} className="ml-auto" />
              </button>
              <button 
                onClick={() => setCurrentPage('patients')}
                className="w-full p-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all flex items-center gap-3"
              >
                <Users size={20} />
                <span className="font-medium">Patient Management</span>
                <ChevronRight size={20} className="ml-auto" />
              </button>
              <button 
                onClick={() => {
                  // Set dummy data for demo report
                  setSelectedImage('/api/placeholder/600/400');
                  setRtpcrData({
                    filename: 'demo_patient_rtpcr_results.csv',
                    uploadTime: new Date().toLocaleString(),
                    markers: {
                      'CDKN2A': { value: 0.23, status: 'deleted', risk: 'high' },
                      'TP53': { value: 0.89, status: 'mutated', risk: 'high' },
                      'CCND1': { value: 2.45, status: 'amplified', risk: 'medium' },
                      'PIK3CA': { value: 1.2, status: 'normal', risk: 'low' },
                      'NOTCH1': { value: 0.8, status: 'normal', risk: 'low' }
                    },
                    overallRisk: 'high'
                  });
                  setAnalysisComplete(true);
                  setShowReport(true);
                }}
                className="w-full p-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all flex items-center gap-3"
              >
                <FileText size={20} />
                <span className="font-medium">View Demo Report</span>
                <ChevronRight size={20} className="ml-auto" />
              </button>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );

  // Upload/Analysis Page
  const UploadPage = () => (
    <div className="p-6 bg-gray-50 min-h-screen">
      <AnimatedCard delay={0}>
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="font-medium text-gray-800 mb-4">Patient Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Patient ID</p>
              <p className="font-medium">{patientInfo.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{patientInfo.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Age</p>
              <p className="font-medium">{patientInfo.age}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-medium">{patientInfo.gender}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">Risk Factors</p>
            <ul className="text-sm">
              {patientInfo.riskFactors.map((factor, index) => (
                <li key={index} className="flex items-center gap-2 mb-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </AnimatedCard>

      {/* Analysis Tabs */}
      <AnimatedCard delay={0.1}>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setAnalysisTab('image')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  analysisTab === 'image'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Camera size={18} />
                  Image Analysis
                </div>
              </button>
              <button
                onClick={() => setAnalysisTab('rtpcr')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  analysisTab === 'rtpcr'
                    ? 'border-purple-500 text-purple-600 bg-purple-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Brain size={18} />
                  RT-PCR Analysis
                </div>
              </button>
            </nav>
          </div>

          <div className="p-6">
            {analysisTab === 'image' && (
              <div>
                <h3 className="font-medium text-gray-800 mb-4">Upload Oral Cavity Image</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Upload a clear, well-lit image of the patient's oral cavity for AI analysis.
                  Supported formats: JPG, PNG (max 10MB)
                </p>
                
                {!selectedImage ? (
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={handleImageUpload}
                  >
                    <Upload size={48} className="text-gray-400 mb-4" />
                    <p className="font-medium text-gray-700 mb-2">Click or drag file to upload</p>
                    <p className="text-sm text-gray-500">High-resolution images provide better analysis results</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <img 
                        src={selectedImage} 
                        alt="Uploaded oral cavity" 
                        className="w-full max-w-2xl mx-auto rounded-lg shadow-md" 
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">Image uploaded successfully</p>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setSelectedImage(null)}
                          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          Replace Image
                        </button>
                        <button 
                          onClick={handleAnalyze}
                          disabled={loading}
                          className={`px-6 py-2 rounded-lg flex items-center gap-2 ${
                            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                          } text-white transition-colors`}
                        >
                          {loading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <Activity size={16} />
                              Analyze Image
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {analysisTab === 'rtpcr' && (
              <div>
                <h3 className="font-medium text-gray-800 mb-4">Upload RT-PCR Data</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Upload RT-PCR gene expression data for molecular analysis. 
                  Supported formats: CSV, Excel (.xlsx, .xls)
                </p>

                {!rtpcrData ? (
                  <div>
                    <div 
                      className="border-2 border-dashed border-purple-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-purple-50 transition-colors"
                      onClick={handleRtpcrUpload}
                    >
                      <Brain size={48} className="text-purple-400 mb-4" />
                      <p className="font-medium text-gray-700 mb-2">Click or drag RT-PCR file to upload</p>
                      <p className="text-sm text-gray-500">Accepted formats: CSV, XLSX, XLS (max 5MB)</p>
                    </div>
                    
                    <div className="mt-6 bg-purple-50 rounded-lg p-4">
                      <h4 className="font-medium text-purple-900 mb-2">Expected Gene Markers</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                        {['CDKN2A', 'TP53', 'CCND1', 'PIK3CA', 'NOTCH1', 'EGFR', 'MYC', 'RB1'].map(gene => (
                          <span key={gene} className="bg-white px-2 py-1 rounded text-purple-700 font-medium">
                            {gene}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <FileText size={20} className="text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{rtpcrData.filename}</p>
                          <p className="text-sm text-gray-600">Uploaded: {rtpcrData.uploadTime}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {Object.entries(rtpcrData.markers).map(([gene, data]) => (
                          <div key={gene} className="bg-white rounded-lg p-3 border">
                            <p className="font-medium text-gray-900 text-sm">{gene}</p>
                            <p className="text-xs text-gray-600">{data.status}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                data.risk === 'high' ? 'bg-red-100 text-red-700' :
                                data.risk === 'medium' ? 'bg-orange-100 text-orange-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {data.risk}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Overall Risk:</span>
                          <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                            rtpcrData.overallRisk === 'high' ? 'bg-red-100 text-red-700' :
                            rtpcrData.overallRisk === 'medium' ? 'bg-orange-100 text-orange-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {rtpcrData.overallRisk.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              setRtpcrData(null);
                              setRtpcrAnalysis(false);
                            }}
                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                          >
                            Replace File
                          </button>
                          <button 
                            onClick={handleAnalyze}
                            disabled={loading}
                            className={`px-6 py-2 rounded-lg flex items-center gap-2 ${
                              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
                            } text-white transition-colors`}
                          >
                            {loading ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Analyzing...
                              </>
                            ) : (
                              <>
                                <Brain size={16} />
                                Analyze RT-PCR
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {(selectedImage || rtpcrData) && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {selectedImage && <Check size={16} className="text-green-600" />}
                    <span className={`text-sm ${selectedImage ? 'text-green-600' : 'text-gray-400'}`}>
                      Image Analysis
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {rtpcrData && <Check size={16} className="text-green-600" />}
                    <span className={`text-sm ${rtpcrData ? 'text-green-600' : 'text-gray-400'}`}>
                      RT-PCR Analysis
                    </span>
                  </div>
                </div>
                <button 
                  onClick={handleAnalyze}
                  disabled={loading || (!selectedImage && !rtpcrData)}
                  className={`px-8 py-3 rounded-lg flex items-center gap-2 font-medium ${
                    loading || (!selectedImage && !rtpcrData)
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg'
                  } text-white transition-all`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Activity size={18} />
                      Run Complete Analysis
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </AnimatedCard>
    </div>
  );

  // Results Page
  const ResultsPage = () => (
    <div className="p-6 bg-gray-50 min-h-screen">
      {analysisComplete && (
        <AnimatedCard delay={0}>
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium text-lg">Comprehensive Analysis Results</h3>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowReport(true)}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-sm flex items-center gap-1 hover:bg-blue-100"
                >
                  <FileText size={14} />
                  Generate Report
                </button>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm flex items-center gap-1 hover:bg-gray-200">
                  <Download size={14} />
                  Export Data
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Analysis Summary */}
              <div className="mb-8 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border-l-4 border-red-500">
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle size={24} className="text-red-600" />
                  <h4 className="text-lg font-semibold text-red-800">High-Risk Detection</h4>
                </div>
                <p className="text-red-700 mb-4">
                  {selectedImage && rtpcrData 
                    ? 'Both imaging and molecular analysis indicate high probability of malignancy. Immediate clinical intervention is recommended.'
                    : selectedImage 
                    ? 'Image analysis indicates high probability of malignancy. Consider molecular testing for comprehensive assessment.'
                    : 'Molecular analysis indicates high-risk genetic profile. Recommend clinical imaging for complete evaluation.'
                  }
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {selectedImage && (
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-sm text-gray-600">Image Analysis Confidence</p>
                      <p className="text-xl font-bold text-red-600">87%</p>
                    </div>
                  )}
                  {rtpcrData && (
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-sm text-gray-600">Molecular Risk Score</p>
                      <p className="text-xl font-bold text-red-600">HIGH</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Analysis Results */}
                {selectedImage && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-4 flex items-center gap-2">
                      <Camera size={16} />
                      CNN Detection Visualization
                    </h4>
                    <div className="relative mb-6">
                      <img 
                        src={selectedImage} 
                        alt="Detection visualization" 
                        className="w-full rounded-lg border border-gray-200" 
                      />
                      <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full border border-red-200 text-sm font-medium text-red-700 flex items-center gap-1">
                        <AlertTriangle size={14} />
                        Suspicious Region
                      </div>
                      
                      {/* Detection overlay */}
                      <div 
                        className="absolute border-2 border-red-500 rounded-lg bg-red-500 bg-opacity-20"
                        style={{ 
                          top: '40%', 
                          left: '35%', 
                          width: '25%', 
                          height: '20%'
                        }}
                      ></div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-4">Detection Metrics</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-700">Malignancy Probability</span>
                          <div className="flex items-center gap-2">
                            <span className="text-red-600 font-bold">87%</span>
                            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-red-500 rounded-full" style={{width: '87%'}}></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Confidence Level</span>
                            <span className="font-medium">High (0.92)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Classification</span>
                            <span className="font-medium text-red-600">SCC</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Region</span>
                            <span className="font-medium">Lateral Tongue</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Model</span>
                            <span className="font-medium">EfficientNet-B4</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* RT-PCR Analysis Results */}
                {rtpcrData && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-4 flex items-center gap-2">
                      <Brain size={16} />
                      RT-PCR Molecular Analysis
                    </h4>
                    <div className="bg-purple-50 rounded-lg p-4 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="font-medium text-purple-900">Gene Expression Profile</h5>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          rtpcrData.overallRisk === 'high' ? 'bg-red-100 text-red-700' :
                          rtpcrData.overallRisk === 'medium' ? 'bg-orange-100 text-orange-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {rtpcrData.overallRisk.toUpperCase()} RISK
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-3">
                        {Object.entries(rtpcrData.markers).map(([gene, data]) => (
                          <div key={gene} className="bg-white rounded-lg p-3 border">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium text-gray-900">{gene}</p>
                                <p className="text-sm text-gray-600">{data.status} (Score: {data.value})</p>
                              </div>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                data.risk === 'high' ? 'bg-red-100 text-red-700' :
                                data.risk === 'medium' ? 'bg-orange-100 text-orange-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {data.risk.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-3">Key Findings</h5>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                          <span><strong>CDKN2A deletion:</strong> Tumor suppressor inactivation detected</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                          <span><strong>TP53 mutation:</strong> Guardian of genome compromised</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                          <span><strong>CCND1 amplification:</strong> Cell cycle dysregulation</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Combined LLM Analysis */}
              <div className="mt-8">
                <h4 className="text-sm font-medium text-gray-500 mb-4 flex items-center gap-2">
                  <Stethoscope size={16} />
                  Integrated Clinical Assessment
                </h4>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="text-sm text-gray-800 space-y-3">
                    {selectedImage && rtpcrData && (
                      <p>
                        <span className="font-medium">Multimodal Analysis Summary:</span> The integration of imaging and molecular data reveals a highly concordant picture of malignancy. 
                        The visual detection model identified a suspicious lesion with 87% probability, while RT-PCR analysis confirms high-risk genetic alterations 
                        characteristic of oral squamous cell carcinoma.
                      </p>
                    )}
                    {selectedImage && <p>
                      <span className="font-medium">Imaging Findings:</span> CNN analysis detected an irregular lesion on the lateral tongue border exhibiting 
                      characteristic malignant features including heterogeneous texture, indistinct borders, and areas of both erythroplakia and leukoplakia.
                    </p>}
                    {rtpcrData && <p>
                      <span className="font-medium">Molecular Findings:</span> RT-PCR analysis reveals critical tumor suppressor inactivation (CDKN2A deletion, TP53 mutation) 
                      combined with oncogene activation (CCND1 amplification). This genetic profile strongly supports the imaging findings and indicates 
                      advanced molecular changes consistent with high-grade dysplasia or invasive carcinoma.
                    </p>}
                    <p>
                      <span className="font-medium">Risk Stratification:</span> {selectedImage && rtpcrData 
                        ? 'The combination of high-probability visual detection and high-risk molecular profile places this patient in the highest risk category for oral cancer. The concordance between imaging and molecular data significantly increases diagnostic confidence.'
                        : selectedImage 
                        ? 'The high-probability visual detection combined with patient risk factors indicates urgent need for molecular analysis and histopathological confirmation.'
                        : 'The high-risk molecular profile requires immediate correlation with clinical imaging and tissue biopsy for comprehensive evaluation.'
                      }
                    </p>
                    <p>
                      <span className="font-medium">Clinical Correlation:</span> Patient's extensive tobacco use history (25 years) aligns perfectly with 
                      {selectedImage && rtpcrData ? ' both the visual presentation and molecular alterations commonly seen in tobacco-associated oral cancers. The CDKN2A/TP53 pathway disruption is particularly characteristic of smoking-related head and neck cancers.'
                      : selectedImage ? ' the visual presentation of oral lesions in high-risk patients. Molecular testing would help confirm the genetic alterations typical of tobacco-associated cancers.'
                      : ' the molecular alterations commonly seen in tobacco-associated oral cancers, particularly the CDKN2A/TP53 pathway disruption characteristic of smoking-related head and neck cancers.'}
                    </p>
                  </div>
                </div>
                
                <h4 className="text-sm font-medium text-gray-500 mb-4">Evidence-Based Recommendations</h4>
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-4 pb-4 border-b border-red-100">
                    <div className="bg-red-100 p-2 rounded-full">
                      <AlertTriangle size={20} className="text-red-600" />
                    </div>
                    <div>
                      <h5 className="font-medium text-red-800">Urgent {selectedImage && rtpcrData ? 'Multidisciplinary ' : ''}Action Required</h5>
                      <p className="text-sm text-red-600 mt-1">
                        {selectedImage && rtpcrData 
                          ? 'Combined high-risk imaging and molecular findings mandate immediate comprehensive evaluation.'
                          : 'High-risk findings require urgent clinical intervention and additional diagnostic workup.'
                        }
                      </p>
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {[
                      'Urgent tissue biopsy with histopathological examination (within 48-72 hours)',
                      selectedImage ? 'Comprehensive head and neck CT/MRI for staging evaluation' : 'Clinical imaging assessment (intraoral photography, CT/MRI)',
                      rtpcrData ? 'Multidisciplinary team consultation (oncology, surgery, radiation therapy)' : 'Molecular analysis (RT-PCR or targeted sequencing panel)',
                      selectedImage && rtpcrData ? 'Consider additional molecular testing (whole exome sequencing) for treatment planning' : 'Genetic counseling and family history assessment',
                      'Patient counseling regarding findings and treatment options',
                      'Follow NCCN Guidelines 2025 for oral cavity cancer workup and staging'
                    ].filter(Boolean).map((recommendation, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-800">{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 border-t border-blue-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-100 rounded-full">
                    <HelpCircle size={16} className="text-blue-700" />
                  </div>
                  <span className="text-sm text-blue-800">
                    Need clarification about the {selectedImage && rtpcrData ? 'multimodal analysis' : selectedImage ? 'imaging findings' : 'molecular findings'}? Our AI assistant can explain specific {selectedImage && rtpcrData ? 'genomic findings or imaging features' : selectedImage ? 'detection features and clinical implications' : 'genetic alterations and their significance'}.
                  </span>
                </div>
                <button 
                  onClick={() => setShowReport(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium"
                >
                  <FileText size={16} />
                  View Full Report
                </button>
              </div>
            </div>
          </div>
        </AnimatedCard>
      )}
      
      {!analysisComplete && (
        <div className="text-center py-16">
          <div className="inline-flex items-center gap-3 bg-white rounded-lg shadow-md px-6 py-4">
            <Activity size={24} className="text-blue-600" />
            <span className="text-lg font-medium text-gray-800">No analysis results available</span>
          </div>
          <p className="text-gray-600 mt-4">Upload an image and/or RT-PCR data and run analysis to see results here.</p>
          <button 
            onClick={() => setCurrentPage('upload')}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start New Analysis
          </button>
        </div>
      )}
    </div>
  );

  // Placeholder pages
  const PlaceholderPage = ({ title, description }) => (
    <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="p-4 bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
          <Settings size={40} className="text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <button 
          onClick={() => setCurrentPage('dashboard')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-hidden flex flex-col">
        <Header />
        <div className="flex-1 overflow-y-auto">
          {currentPage === 'dashboard' && <DashboardPage />}
          {currentPage === 'upload' && <UploadPage />}
          {currentPage === 'results' && <ResultsPage />}
          {currentPage === 'patients' && <PlaceholderPage title="Patient Management" description="Manage patient records and medical history." />}
          {currentPage === 'reports' && <PlaceholderPage title="Analytics & Reports" description="View system analytics and generate comprehensive reports." />}
        </div>
      </div>
      {showReport && <MedicalReport />}
    </div>
  );
};

export default OralCancerDetectionSystem;