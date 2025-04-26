import { useState } from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'consent', title: 'Consent' },
    { id: 'information', title: 'Information We Collect' },
    { id: 'usage', title: 'How We Use Your Information' },
    { id: 'log-files', title: 'Log Files' },
    { id: 'advertising', title: 'Advertising Partners' },
    { id: 'third-party', title: 'Third Party Policies' },
    { id: 'ccpa', title: 'CCPA Privacy Rights' },
    { id: 'gdpr', title: 'GDPR Data Protection Rights' },
    { id: 'children', title: "Children's Information" },
    { id: 'changes', title: 'Changes to This Policy' },
    { id: 'contact', title: 'Contact Us' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-blue-950">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80 z-0"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 z-0"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop')" }}
        ></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Our <span className="text-yellow-400">Privacy</span> Policy
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Your privacy is important to us at Party Bash
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Content Layout */}
      <section className="py-12">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-bold text-blue-900 mb-6">Policy Sections</h2>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`block w-full text-left px-4 py-3 rounded-lg transition-all ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 font-medium border-l-4 border-orange-500'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Introduction */}
              <div id="introduction" className={`p-8 ${activeSection === 'introduction' ? 'block' : 'hidden'}`}>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Introduction</h2>
                <div className="prose max-w-none text-gray-700">
                  <p>
                    At Party Bash, accessible from www.party-bash.com, safeguarding the privacy of our visitors is one of our primary concerns. This Privacy Policy document outlines the types of information collected and recorded by Party Bash, and how we utilize it.
                  </p>
                  <p>
                    If you have any further inquiries or need additional details regarding our Privacy Policy, feel free to reach out to us at +91 70 75 456 456.
                  </p>
                  <p>
                    This Privacy Policy pertains solely to our online activities and applies to visitors to our website concerning the information they share and/or collect on PartyBash. It does not extend to any data collected offline or through channels other than this website.
                  </p>
                </div>
              </div>

              {/* Consent */}
              <div id="consent" className={`p-8 ${activeSection === 'consent' ? 'block' : 'hidden'}`}>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Consent</h2>
                <div className="prose max-w-none text-gray-700">
                  <p>
                    By utilizing our website, you acknowledge and consent to abide by our Privacy Policy and its terms.
                  </p>
                </div>
              </div>

              {/* Information We Collect */}
              <div id="information" className={`p-8 ${activeSection === 'information' ? 'block' : 'hidden'}`}>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Information We Collect</h2>
                <div className="prose max-w-none text-gray-700">
                  <p>
                    The personal information requested from you, and the reasons for its request, will be clearly communicated at the time we solicit such details.
                  </p>
                  <p>
                    If you reach out to us directly, we may acquire supplementary information about you, including your name, email address, phone number, the content of your message, any attachments you send, and any other details you opt to share.
                  </p>
                  <p>
                    Upon registration for an Account, we may request your contact details, which may include your name, company name, address, email address, and telephone number.
                  </p>
                </div>
              </div>

              {/* How We Use Your Information */}
              <div id="usage" className={`p-8 ${activeSection === 'usage' ? 'block' : 'hidden'}`}>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">How We Use Your Information</h2>
                <div className="prose max-w-none text-gray-700">
                  <p>We utilize the information we gather in various ways, including:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Providing, operating, and maintaining our website</li>
                    <li>Enhancing, customizing, and expanding our website</li>
                    <li>Analyzing and comprehending how you utilize our website</li>
                    <li>Creating new products, services, features, and functionalities</li>
                    <li>Communicating with you directly or through our partners, for customer service, updates about the website, and for marketing and promotional activities</li>
                    <li>Sending you emails</li>
                    <li>Detecting and preventing fraud</li>
                  </ul>
                </div>
              </div>

              {/* Log Files */}
              <div id="log-files" className={`p-8 ${activeSection === 'log-files' ? 'block' : 'hidden'}`}>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Log Files</h2>
                <div className="prose max-w-none text-gray-700">
                  <p>
                    Party Bash adheres to a standard practice of utilizing log files. These files record visitors' activities upon accessing websites. This practice is common among hosting companies and forms a part of hosting services' analytics. The information collected via log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. None of this information is linked to personally identifiable data. The purpose of collecting this information is to analyze trends, administer the site, track users' movements on the website, and gather demographic insights.
                  </p>
                </div>
              </div>

              {/* Advertising Partners */}
              <div id="advertising" className={`p-8 ${activeSection === 'advertising' ? 'block' : 'hidden'}`}>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Our Advertising Partners</h2>
                <div className="prose max-w-none text-gray-700">
                  <p>
                    Some advertisers on our site may employ cookies and web beacons. Below, we list our advertising partners, each of whom maintains their own Privacy Policy regarding user data.
                  </p>
                  <p>
                    Third-party ad servers or ad networks utilize technologies such as cookies, JavaScript, or Web Beacons in their advertisements and links displayed on Party Bash. These are directly transmitted to users' browsers. Your IP address is automatically received during this process. These technologies are employed to gauge the effectiveness of their advertising campaigns and/or to customize the advertising content displayed on websites you visit.
                  </p>
                  <p>
                    Please note that Party Bash does not have access to or control over the cookies used by third-party advertisers.
                  </p>
                </div>
              </div>

              {/* Third Party Privacy Policies */}
              <div id="third-party" className={`p-8 ${activeSection === 'third-party' ? 'block' : 'hidden'}`}>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Third Party Privacy Policies</h2>
                <div className="prose max-w-none text-gray-700">
                  <p>
                    Party Bash's Privacy Policy does not extend to other advertisers or websites. Therefore, we recommend consulting the Privacy Policies of these third-party ad servers for comprehensive information. These policies may encompass their practices and instructions on how to opt-out of specific options.
                  </p>
                  <p>
                    You have the option to disable cookies via your browser's individual settings. For more detailed information on cookie management with particular web browsers, please refer to the respective websites of the browsers.
                  </p>
                </div>
              </div>

              {/* CCPA Privacy Rights */}
              <div id="ccpa" className={`p-8 ${activeSection === 'ccpa' ? 'block' : 'hidden'}`}>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">CCPA Privacy Rights</h2>
                <div className="prose max-w-none text-gray-700">
                  <p>Under the CCPA, California consumers have certain rights, including:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Requesting that a business collecting personal data disclose the categories and specific pieces of personal data collected about consumers.</li>
                    <li>Requesting that a business delete any personal data collected about the consumer.</li>
                    <li>Requesting that a business that sells personal data refrain from selling the consumer's personal data.</li>
                  </ul>
                  <p>
                    If you make a request, we have one month to respond to you. To exercise any of these rights, please contact us.
                  </p>
                </div>
              </div>

              {/* GDPR Data Protection Rights */}
              <div id="gdpr" className={`p-8 ${activeSection === 'gdpr' ? 'block' : 'hidden'}`}>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">GDPR Data Protection Rights</h2>
                <div className="prose max-w-none text-gray-700">
                  <p>We want to ensure that you are fully aware of all your data protection rights. Every user is entitled to the following:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>The right to access</strong> – You have the right to request copies of your personal data. We may charge a small fee for this service.</li>
                    <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete information you believe is incomplete.</li>
                    <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
                    <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                    <li><strong>The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.</li>
                    <li><strong>The right to data portability</strong> – You have the right to request that we transfer the data we have collected to another organization, or directly to you, under certain conditions.</li>
                  </ul>
                </div>
              </div>

              {/* Children's Information */}
              <div id="children" className={`p-8 ${activeSection === 'children' ? 'block' : 'hidden'}`}>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Children's Information</h2>
                <div className="prose max-w-none text-gray-700">
                  <p>
                    Another aspect of our commitment is to safeguard children's online activities. We urge parents and guardians to actively monitor and guide their children's internet usage.
                  </p>
                  <p>
                    Party Bash does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you believe that your child has provided such information on our website, we strongly advise you to contact us immediately. We will make every effort to promptly remove such information from our records.
                  </p>
                </div>
              </div>

              {/* Changes to This Privacy Policy */}
              <div id="changes" className={`p-8 ${activeSection === 'changes' ? 'block' : 'hidden'}`}>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Changes to This Privacy Policy</h2>
                <div className="prose max-w-none text-gray-700">
                  <p>
                    We reserve the right to update our Privacy Policy periodically. Therefore, we recommend that you revisit this page regularly to stay informed about any alterations. We will inform you of any changes by posting the revised Privacy Policy on this page. These modifications take effect immediately upon being posted on this page.
                  </p>
                </div>
              </div>

              {/* Contact Us */}
              <div id="contact" className={`p-8 ${activeSection === 'contact' ? 'block' : 'hidden'}`}>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Contact Us</h2>
                <div className="prose max-w-none text-gray-700">
                  <p>
                    If you have any questions or suggestions regarding our Privacy Policy, please feel free to contact us at +91 70 75 456 456.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-pink-500">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Have Questions About Your Data?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Our team is happy to clarify any aspect of our privacy practices
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="tel:+917075456456" 
              className="px-8 py-4 bg-white text-orange-600 rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Call Us Now
            </a>
            <Link
              to="/contact"
              className="px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-all"
            >
              Contact Form
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;