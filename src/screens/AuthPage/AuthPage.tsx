import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { Button } from "../../components/ui/button";
import { FooterSection } from "../LandingPage/sections/FooterSection";

export const AuthPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"signin" | "register">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccessMessage("");
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    if (!resetEmail) {
      setError("Please enter your email address");
      setLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setSuccessMessage("Password reset email sent! Check your inbox.");
      setResetEmail("");
      setTimeout(() => {
        setShowForgotPassword(false);
        setSuccessMessage("");
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Failed to send password reset email");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.firstName || !formData.lastName) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Facebook");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = activeTab === "signin" ? handleSignIn : handleRegister;

  return (
    <div className="min-h-screen bg-[#F9F6F2] flex flex-col">
      <header className="w-full h-16 sm:h-20 lg:h-24 bg-[#FFFFFF] px-4 sm:px-8 lg:px-12 py-4 sm:py-5 lg:py-6 shadow-sm">
        <div className="flex items-center justify-between h-full max-w-[1440px] mx-auto">
          <Link
            to="/"
            className="[font-family:'Arsenica_Trial-Demibold',Helvetica] font-normal text-black text-2xl sm:text-3xl lg:text-4xl tracking-[0] leading-[normal] hover:opacity-80 transition-opacity"
          >
            KUTHAIR
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <div className="flex border-b border-gray-200 mb-8">
            <button
              onClick={() => setActiveTab("signin")}
              className={`flex-1 pb-4 text-sm sm:text-base font-semibold transition-all ${
                activeTab === "signin"
                  ? "text-black border-b-2 border-black"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              SIGN IN
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 pb-4 text-sm sm:text-base font-semibold transition-all ${
                activeTab === "register"
                  ? "text-black border-b-2 border-black"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              REGISTER
            </button>
          </div>

          {activeTab === "signin" ? (
            <div>
              <div className="text-center mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-black mb-2">
                  WELCOME BACK
                </h2>
                <p className="text-sm text-gray-600">
                  Sign in to your KUTHAIR account
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="signin-email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="signin-email"
                    name="email"
                    placeholder="Enter email here"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E3A857] focus:border-transparent text-sm"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="signin-password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="signin-password"
                      name="password"
                      placeholder="Enter Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E3A857] focus:border-transparent text-sm pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOffIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(true);
                      setError("");
                      setSuccessMessage("");
                    }}
                    className="text-[#E3A857] text-sm font-medium hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#E3A857] hover:bg-[#d19a4a] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  {loading ? "SIGNING IN..." : "SIGN IN"}
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Or</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">
                      Continue with google
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleFacebookSignIn}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="#1877F2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">
                      Continue with Facebook
                    </span>
                  </button>
                </div>

                <p className="text-center text-sm text-gray-600 mt-6">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setActiveTab("register")}
                    className="text-[#E3A857] font-medium hover:underline"
                  >
                    Register now
                  </button>
                </p>
              </form>
            </div>
          ) : (
            <div>
              <div className="text-center mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-black mb-2">
                  CREATE ACCOUNT
                </h2>
                <p className="text-sm text-gray-600">
                  Join us for a personalized luxury hair experience
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E3A857] focus:border-transparent text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E3A857] focus:border-transparent text-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="register-email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="register-email"
                    name="email"
                    placeholder="Enter email here"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E3A857] focus:border-transparent text-sm"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="register-password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="register-password"
                      name="password"
                      placeholder="Enter Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E3A857] focus:border-transparent text-sm pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOffIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#E3A857] hover:bg-[#d19a4a] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Or</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">
                      Continue with google
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleFacebookSignIn}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="#1877F2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">
                      Continue with Facebook
                    </span>
                  </button>
                </div>

                <p className="text-center text-sm text-gray-600 mt-6">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setActiveTab("signin")}
                    className="text-[#E3A857] font-medium hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              </form>
            </div>
          )}
        </div>
      </div>

      <FooterSection />

      {showForgotPassword && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 max-w-md w-full">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-2">
                  Reset Password
                </h3>
                <p className="text-sm text-gray-600">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>
              <button
                onClick={() => {
                  setShowForgotPassword(false);
                  setError("");
                  setSuccessMessage("");
                  setResetEmail("");
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700">{successMessage}</p>
              </div>
            )}

            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label
                  htmlFor="reset-email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="reset-email"
                  value={resetEmail}
                  onChange={(e) => {
                    setResetEmail(e.target.value);
                    setError("");
                    setSuccessMessage("");
                  }}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E3A857] focus:border-transparent text-sm"
                  required
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setError("");
                    setSuccessMessage("");
                    setResetEmail("");
                  }}
                  variant="outline"
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#E3A857] hover:bg-[#d19a4a] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
