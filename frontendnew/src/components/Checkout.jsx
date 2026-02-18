import React, { useState } from 'react'
import Loginmodal from './Loginmodal'
import TermsAndConditions from './TermsAndConditions';
import Forgetpasswordmodal from './Forgetpasswordmodal';
import { toast } from "react-toastify";


function Checkout() {

    const [showlogin, setShowlogin] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [showForgetPassword, setShowForgetPassword] = useState(false);

    const [membership, setMembership] = useState("");
    const [services, setServices] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        country: "",
        coupon: ""
    });

    const handleServiceChange = (value) => {
        setServices(prev =>
            prev.includes(value)
                ? prev.filter(i => i !== value)
                : [...prev, value]
        );
    };

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {

    if (!membership) {
        toast.warning("Please select a membership");
        return;
    }

    if (!paymentMethod) {
        toast.warning("Please select a payment method");
        return;
    }

    const requiredFields = [
        "firstName", "lastName", "email",
        "username", "password", "confirmPassword", "country"
    ];

    for (let field of requiredFields) {
        if (!userData[field]) {
            toast.error("Please fill all required user details");
            return;
        }
    }

    if (userData.password !== userData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
    }

    toast.success("Checkout details validated ✅");

    console.log("FINAL CHECKOUT DATA:", {
        membership,
        services,
        paymentMethod,
        userData
    });
};


    return (
        <div className="min-h-screen bg-sky-100 px-4 sm:px-6 lg:px-10">

            <div className="flex justify-center py-6 sm:py-10">
                <div className="bg-white w-full max-w-6xl rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">

                    <h1 className="font-semibold text-xl sm:text-2xl text-gray-600">
                        TH Shop Mania Pro Annual Plan
                    </h1>

                    <div className="mt-4 bg-blue-100 p-4 rounded-xl">
                        <p className="text-sm sm:text-base font-semibold text-gray-600">
                            If you already have an account,
                            <button
                                onClick={() => setShowlogin(true)}
                                className="text-sky-500 underline mx-1"
                            >
                                log in
                            </button>
                            to continue
                        </p>
                    </div>

                    {/* Membership */}
                    <section className="mt-10 space-y-8">

                        <div className="flex flex-col lg:flex-row gap-6">
                            <h2 className="text-xl font-bold min-w-60">
                                <span className="text-red-600">*</span> Membership Type
                            </h2>

                            <div className="space-y-6">
                                {[
                                    ["th-pro-annual", "TH Shop Mania Pro", "$59.00"],
                                    ["oth-lifetime", "OTH Shop Mania Lifetime", "$149.00"],
                                    ["full-annual", "FULL MEMBERSHIP - ANNUAL", "$169.00"],
                                    ["full-lifetime", "FULL MEMBERSHIP - LIFETIME", "$349.00"]
                                ].map(([value, label, price]) => (
                                    <label key={value} className="flex gap-4">
                                        <input
                                            type="radio"
                                            name="membership"
                                            value={value}
                                            checked={membership === value}
                                            onChange={(e) => setMembership(e.target.value)}
                                            className="scale-125 mt-1"
                                        />
                                        <div>
                                            <p className="font-semibold">{label} – {price}</p>
                                            <p className="text-gray-500 text-sm mt-1">
                                                Premium Addon / Full Access
                                            </p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Services */}
                        <div className="flex flex-col lg:flex-row gap-6">
                            <h2 className="text-xl font-bold min-w-60">
                                Recommended Services (optional)
                            </h2>

                            <div className="space-y-6">
                                {[
                                    ["theme-setup-1", "Install Theme + Demo (1 site)"],
                                    ["theme-setup-wp-1", "Theme + WP Install ($39)"],
                                    ["theme-setup-wp-3", "Theme + WP Install (3 sites)"],
                                    ["site-transfer", "WordPress Site Transfer ($79)"]
                                ].map(([value, label]) => (
                                    <label key={value} className="flex gap-4">
                                        <input
                                            type="checkbox"
                                            checked={services.includes(value)}
                                            onChange={() => handleServiceChange(value)}
                                            className="scale-125 mt-1"
                                        />
                                        <span className="font-semibold">{label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Payment */}
                        <div className="flex flex-col lg:flex-row gap-6">
                            <h2 className="text-xl font-bold min-w-60">
                                <span className="text-red-600">*</span> Payment System
                            </h2>

                            <div className="space-y-6">
                                {["stripe", "paypal", "fastspring"].map(method => (
                                    <label key={method} className="flex gap-4">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value={method}
                                            checked={paymentMethod === method}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="scale-125 mt-1"
                                        />
                                        <span className="font-semibold capitalize">{method}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* User Details */}
                        <section className="mt-16">
                            <h2 className="text-2xl font-bold text-center mb-8">
                                User Detail
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {Object.entries(userData).map(([key, value]) => (
                                    <input
                                        key={key}
                                        type={key.toLowerCase().includes("password") ? "password" : "text"}
                                        name={key}
                                        value={value}
                                        onChange={handleUserChange}
                                        placeholder={key.replace(/([A-Z])/g, ' $1')}
                                        className="px-4 py-3 border border-gray-300 focus:border-sky-400 outline-none"
                                    />
                                ))}
                            </div>
                        </section>

                        {/* Terms */}
                        <div className="text-center mt-14">
                            <label className="flex flex-wrap justify-center items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={acceptedTerms}
                                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                                    className="scale-125"
                                />
                                <span className="font-semibold">I agree to</span>
                                <span
                                    onClick={() => setShowTerms(true)}
                                    className="text-blue-600 underline cursor-pointer font-semibold"
                                >
                                    Terms & Conditions
                                </span>
                            </label>

                            <button
                                disabled={!acceptedTerms}
                                onClick={handleNext}
                                className={`mt-6 px-8 py-3 rounded-xl font-bold transition
                                    ${acceptedTerms
                                        ? "bg-blue-950 text-white hover:bg-blue-900"
                                        : "bg-gray-400 text-gray-700 cursor-not-allowed"
                                    }`}
                            >
                                Next
                            </button>
                        </div>

                    </section>
                </div>
            </div>

            {/* Modals */}
            <Loginmodal
                show={showlogin}
                onClose={() => setShowlogin(false)}
                onForgetPassword={() => {
                    setShowForgetPassword(true);
                    setShowlogin(false);
                }}
            />

            {showForgetPassword && (
                <Forgetpasswordmodal
                    show={showForgetPassword}
                    onClose={() => setShowForgetPassword(false)}
                    onLoginClick={() => {
                        setShowForgetPassword(false);
                        setShowlogin(true);
                    }}
                />
            )}

            {showTerms && (
                <TermsAndConditions
                    show={showTerms}
                    onClose={() => setShowTerms(false)}
                />
            )}
        </div>
    );
}

export default Checkout;
