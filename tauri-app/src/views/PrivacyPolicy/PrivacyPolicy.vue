<template>
  <div>
    <div class="flex justify-center">
      <img
        src="/src/assets/fusion.svg"
        class="logo fusion h-32 w-32"
        alt="Fusion"
      />
    </div>
    <h1 class="text-4xl font-bold text-offblack mb-8 font-heading text-center">
      FUSION.
    </h1>
  </div>
  <div
    class="max-w-3xl mx-auto px-4 py-10 font-mono text-offblack bg-white rounded-lg shadow-lg mb-10"
    style="overflow-y: auto"
  >
    <h1 class="text-3xl font-bold mb-2">Privacy Policy for Fusion PI</h1>
    <p class="text-sm text-offgray mb-6">
      <span class="font-semibold">Last Updated:</span> 14.8.2025<br />
      <span class="font-semibold">Version:</span> 1.0
    </p>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-2">Introduction</h2>
      <p>
        Fusion PI ("we," "our," or "us") is committed to protecting your
        privacy. This Privacy Policy explains how we collect, use, and safeguard
        your information when you use our timetable application.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-2">Information We Collect</h2>
      <h3 class="text-xl font-semibold mt-4 mb-1">Information You Provide</h3>
      <ul class="list-disc list-inside mb-2">
        <li>
          <span class="font-semibold">Google Account Information</span>: When
          you sign in with Google, we collect:
          <ul class="list-disc list-inside ml-6">
            <li>Your email address</li>
            <li>Your display name</li>
            <li>Your profile picture (if available)</li>
            <li>Your Google Workspace domain (if applicable)</li>
          </ul>
        </li>
      </ul>
      <h3 class="text-xl font-semibold mt-4 mb-1">
        Information We Automatically Collect
      </h3>
      <ul class="list-disc list-inside">
        <li>
          <span class="font-semibold">Authentication Data</span>: Firebase
          authentication tokens and user IDs
        </li>
        <li>
          <span class="font-semibold">App Usage</span>: Basic app interaction
          data for functionality
        </li>
        <li>
          <span class="font-semibold">Device Information</span>: Basic device
          information for app compatibility
        </li>
      </ul>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-2">How We Use Your Information</h2>
      <h3 class="text-xl font-semibold mt-4 mb-1">Primary Uses</h3>
      <ul class="list-disc list-inside mb-2">
        <li>
          <span class="font-semibold">Authentication</span>: To verify your
          identity and provide secure access
        </li>
        <li>
          <span class="font-semibold">App Functionality</span>: To provide
          timetable and scheduling features
        </li>
        <li>
          <span class="font-semibold">User Experience</span>: To personalize
          your app experience
        </li>
        <li>
          <span class="font-semibold">Google Workspace Integration</span>: To
          detect if you're a workspace user for enhanced features
        </li>
      </ul>
      <h3 class="text-xl font-semibold mt-4 mb-1">Specific Permission Usage</h3>
      <h4 class="font-semibold mt-2">Google Sign-In</h4>
      <ul class="list-disc list-inside ml-6 mb-2">
        <li>
          <span class="font-semibold">Purpose</span>: Secure authentication and
          user identification
        </li>
        <li>
          <span class="font-semibold">Data</span>: Email, name, profile picture,
          and authentication tokens
        </li>
        <li>
          <span class="font-semibold">Storage</span>: Securely stored in
          Firebase Authentication
        </li>
      </ul>
      <h4 class="font-semibold mt-2">Google Admin SDK (Optional)</h4>
      <ul class="list-disc list-inside ml-6">
        <li>
          <span class="font-semibold">Purpose</span>: To detect if you're a
          Google Workspace super admin
        </li>
        <li>
          <span class="font-semibold">Permissions Requested</span>:
          <ul class="list-disc list-inside ml-6">
            <li>
              <code
                >https://www.googleapis.com/auth/admin.directory.user.readonly</code
              >
            </li>
            <li>
              <code
                >https://www.googleapis.com/auth/admin.directory.rolemanagement.readonly</code
              >
            </li>
          </ul>
        </li>
        <li>
          <span class="font-semibold">Data</span>: Basic user role information
          (admin status only)
        </li>
        <li>
          <span class="font-semibold">Usage</span>: To show appropriate badges
          and permissions in the app
        </li>
      </ul>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-2">Data Storage and Security</h2>
      <h3 class="text-xl font-semibold mt-4 mb-1">Where We Store Data</h3>
      <ul class="list-disc list-inside mb-2">
        <li>
          <span class="font-semibold">Firebase Authentication</span>: User
          account information
        </li>
        <li>
          <span class="font-semibold">Firebase Firestore</span>: App-specific
          data (if implemented)
        </li>
        <li>
          <span class="font-semibold">Local Storage</span>: App preferences and
          settings
        </li>
      </ul>
      <h3 class="text-xl font-semibold mt-4 mb-1">Security Measures</h3>
      <ul class="list-disc list-inside">
        <li>
          <span class="font-semibold">Encryption</span>: All data is encrypted
          in transit and at rest
        </li>
        <li>
          <span class="font-semibold">Authentication</span>: Secure Google
          OAuth2 authentication
        </li>
        <li>
          <span class="font-semibold">Access Control</span>: Limited access to
          authorized personnel only
        </li>
        <li>
          <span class="font-semibold">Regular Updates</span>: Security patches
          and updates applied regularly
        </li>
      </ul>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-2">Data Sharing</h2>
      <h3 class="text-xl font-semibold mt-4 mb-1">We Do NOT Share</h3>
      <ul class="list-disc list-inside mb-2">
        <li>Your personal information with third parties</li>
        <li>Your Google account details with external services</li>
        <li>Your app usage data with advertisers</li>
        <li>Your timetable or scheduling information</li>
      </ul>
      <h3 class="text-xl font-semibold mt-4 mb-1">Limited Sharing</h3>
      <ul class="list-disc list-inside">
        <li>
          <span class="font-semibold">Firebase Services</span>: Data is
          processed by Google's Firebase services (covered by Google's privacy
          policy)
        </li>
        <li>
          <span class="font-semibold">Legal Requirements</span>: Only if
          required by law or to protect our rights
        </li>
      </ul>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-2">Your Rights and Choices</h2>
      <h3 class="text-xl font-semibold mt-4 mb-1">Access and Control</h3>
      <ul class="list-disc list-inside mb-2">
        <li>
          <span class="font-semibold">View Data</span>: Access your stored
          information through the app
        </li>
        <li>
          <span class="font-semibold">Delete Account</span>: Remove your account
          and associated data
        </li>
        <li>
          <span class="font-semibold">Data Export</span>: Request a copy of your
          data (contact us)
        </li>
      </ul>
      <h3 class="text-xl font-semibold mt-4 mb-1">Opt-Out Options</h3>
      <ul class="list-disc list-inside">
        <li>
          <span class="font-semibold">Google Permissions</span>: You can revoke
          app permissions in your Google Account settings
        </li>
        <li>
          <span class="font-semibold">Admin SDK</span>: You can decline the
          additional Admin SDK permissions during sign-in
        </li>
      </ul>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-2">Data Retention</h2>
      <h3 class="text-xl font-semibold mt-4 mb-1">Account Data</h3>
      <ul class="list-disc list-inside mb-2">
        <li>
          <span class="font-semibold">Active Accounts</span>: Retained while
          your account is active
        </li>
        <li>
          <span class="font-semibold">Deleted Accounts</span>: Permanently
          deleted within 30 days
        </li>
        <li>
          <span class="font-semibold">Inactive Accounts</span>: May be deleted
          after 12 months of inactivity
        </li>
      </ul>
      <h3 class="text-xl font-semibold mt-4 mb-1">App Data</h3>
      <ul class="list-disc list-inside">
        <li>
          <span class="font-semibold">User Preferences</span>: Stored locally
          and can be cleared by the user
        </li>
        <li>
          <span class="font-semibold">Timetable Data</span>: Stored securely and
          deleted with account removal
        </li>
      </ul>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-2">Children's Privacy</h2>
      <p>
        Fusion PI is not intended for children under 13 years of age. We do not
        knowingly collect personal information from children under 13. If you
        are a parent or guardian and believe your child has provided us with
        personal information, please contact us.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-2">International Data Transfers</h2>
      <p>
        Your information may be transferred to and processed in countries other
        than your own. We ensure appropriate safeguards are in place to protect
        your data in accordance with this Privacy Policy.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-2">Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you
        of any changes by:
      </p>
      <ul class="list-disc list-inside ml-6">
        <li>Posting the new Privacy Policy in the app</li>
        <li>Updating the "Last Updated" date</li>
        <li>Sending you a notification (if you have notifications enabled)</li>
      </ul>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-2">Contact Information</h2>
      <p>
        If you have questions about this Privacy Policy or our data practices,
        please contact us:
      </p>
      <ul class="list-disc list-inside ml-6">
        <li><span class="font-semibold">Email</span>: [Your Contact Email]</li>
        <li>
          <span class="font-semibold">App Support</span>: Through the app's
          support features
        </li>
        <li>
          <span class="font-semibold">Address</span>: [Your Business Address]
        </li>
      </ul>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-2">Third-Party Services</h2>
      <h3 class="text-xl font-semibold mt-4 mb-1">Google Services</h3>
      <ul class="list-disc list-inside mb-2">
        <li>
          <span class="font-semibold">Google Sign-In</span>: Authentication
          service
        </li>
        <li>
          <span class="font-semibold">Google Admin SDK</span>: Workspace role
          detection (optional)
        </li>
        <li>
          <span class="font-semibold">Firebase</span>: Backend services and data
          storage
        </li>
      </ul>
      <h3 class="text-xl font-semibold mt-4 mb-1">
        Third-Party Privacy Policies
      </h3>
      <ul class="list-disc list-inside">
        <li>
          <a
            href="https://policies.google.com/privacy"
            class="text-blue-600 underline"
            target="_blank"
            rel="noopener"
            >Google Privacy Policy</a
          >
        </li>
        <li>
          <a
            href="https://firebase.google.com/support/privacy"
            class="text-blue-600 underline"
            target="_blank"
            rel="noopener"
            >Firebase Privacy Policy</a
          >
        </li>
      </ul>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-2">Compliance</h2>
      <p>This Privacy Policy complies with:</p>
      <ul class="list-disc list-inside ml-6">
        <li>General Data Protection Regulation (GDPR)</li>
        <li>California Consumer Privacy Act (CCPA)</li>
        <li>Other applicable privacy laws and regulations</li>
      </ul>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-2">Consent</h2>
      <p>
        By using Fusion PI, you consent to the collection and use of your
        information as described in this Privacy Policy. If you do not agree
        with this policy, please do not use the app.
      </p>
    </section>

    <div class="border-t border-gray-200 pt-4 mt-8 text-xs text-offgray">
      <p>
        <span class="font-semibold">Note</span>: This privacy policy is specific
        to Fusion PI and covers only the permissions and data usage described.
        If you add additional features or permissions in the future, please
        update this policy accordingly.
      </p>
    </div>
  </div>
</template>
