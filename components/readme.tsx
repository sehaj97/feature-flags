export default function Readme() {
  return (
    <div className="prose max-w-4xl mx-auto p-6">
      <h1>Feature Flag Demo App</h1>

      <h2>How the Feature Flag System Works</h2>
      <p>
        This demo implements a lightweight feature flag system entirely on the frontend using React Context for state
        management and localStorage for persistence. The system supports:
      </p>
      <ul>
        <li>
          <strong>Simple on/off toggles</strong> - Enable or disable features with a single switch
        </li>
        <li>
          <strong>Percentage-based rollouts</strong> - Gradually release features to a percentage of users
        </li>
        <li>
          <strong>User segment targeting</strong> - Target specific user segments (guest, beta, premium)
        </li>
        <li>
          <strong>Persistent state</strong> - Feature flag settings persist across page refreshes
        </li>
      </ul>

      <h2>Fintech Features and Implementation</h2>
      <p>The demo showcases five different fintech features, each demonstrating a different feature flag strategy:</p>

      <h3>1. Hero Component (MVP → Final)</h3>
      <p>Demonstrates the evolution from an MVP to a final polished version:</p>
      <ul>
        <li>
          <strong>MVP Version:</strong> Simple headline and button with minimal styling
        </li>
        <li>
          <strong>Final Version:</strong> Rich design with animations, multiple CTAs, imagery, and advanced styling
        </li>
      </ul>
      <p>
        <strong>Purpose:</strong> MVP-first launch, then polish under the hood and flip the switch
      </p>

      <h3>2. Dashboard Overview (Gradual Rollout)</h3>
      <p>Shows how to gradually roll out a complex feature:</p>
      <ul>
        <li>
          <strong>MVP Version:</strong> Simple balance and recent transactions
        </li>
        <li>
          <strong>Final Version:</strong> Rich dashboard with budget breakdown, quick actions, and visual indicators
        </li>
      </ul>
      <p>
        <strong>Purpose:</strong> Staged rollout to a percentage of users or internal team
      </p>

      <h3>3. Virtual Card Widget (Segmented Access)</h3>
      <p>Demonstrates how to restrict features to specific user segments:</p>
      <ul>
        <li>
          <strong>Shown only to:</strong> Premium or verified users
        </li>
      </ul>
      <p>
        <strong>Purpose:</strong> Simulate user targeting and permissions-based UI
      </p>

      <h3>4. Smart Search in Transactions (A/B Testing)</h3>
      <p>Shows how to implement A/B testing for UI/UX enhancements:</p>
      <ul>
        <li>
          <strong>MVP Version:</strong> Basic search bar
        </li>
        <li>
          <strong>Final Version:</strong> AI-powered fuzzy search with autocomplete and filters
        </li>
      </ul>
      <p>
        <strong>Purpose:</strong> A/B test UI/UX enhancements with random assignment
      </p>

      <h3>5. Support Chat Widget (Kill Switch)</h3>
      <p>Demonstrates how to implement a kill switch for emergency situations:</p>
      <ul>
        <li>
          <strong>MVP Version:</strong> Email-only support message
        </li>
        <li>
          <strong>Final Version:</strong> Live chat support widget
        </li>
      </ul>
      <p>
        <strong>Purpose:</strong> Demonstrate emergency toggle for buggy live features
      </p>

      <h2>Simulating Different Scenarios</h2>
      <h3>A/B Testing</h3>
      <p>
        To simulate A/B testing, set the rollout strategy to "Percentage rollout" and adjust the slider to 50%. This
        will randomly assign users to either the MVP or final version based on a consistent user ID stored in
        localStorage.
      </p>

      <h3>User Targeting</h3>
      <p>To simulate different user experiences:</p>
      <ol>
        <li>Set the rollout strategy to "User segment"</li>
        <li>Select which user segments should see the feature</li>
        <li>Switch between user types in the "User Simulation" tab</li>
      </ol>

      <h3>Kill Switch</h3>
      <p>
        If you need to quickly disable a feature and revert to the MVP, simply toggle the feature flag off. This
        demonstrates how feature flags provide a safety mechanism for quickly reverting problematic features without a
        code deployment.
      </p>

      <h2>Business Value</h2>
      <p>This approach demonstrates several key business benefits:</p>
      <ul>
        <li>
          <strong>Faster Time to Market:</strong> Launch with an MVP while continuing to develop the final version
        </li>
        <li>
          <strong>Risk Mitigation:</strong> Ability to instantly revert to a stable version if issues arise
        </li>
        <li>
          <strong>Targeted Releases:</strong> Release new features to specific user segments for feedback
        </li>
        <li>
          <strong>Experimentation:</strong> Run A/B tests to validate design and UX decisions with real users
        </li>
        <li>
          <strong>Continuous Delivery:</strong> Ship code continuously behind feature flags, decoupling deployment from
          release
        </li>
      </ul>

      <h2>Production Implementation</h2>
      <p>In a production environment, this approach would be enhanced with:</p>
      <ul>
        <li>Server-side feature flag evaluation for security and consistency</li>
        <li>Integration with a dedicated feature flag service (LaunchDarkly, Split.io, etc.)</li>
        <li>Analytics integration to measure the impact of features</li>
        <li>More sophisticated user targeting based on user properties, behavior, or location</li>
        <li>Automated testing of both feature variations</li>
      </ul>
    </div>
  )
}

