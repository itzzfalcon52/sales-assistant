import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import LeadDetails from "./pages/LeadDetails";
import Conversation from "./pages/Conversation";
import Actions from "./pages/Actions";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Shared application layout */}
        <Route element={<Layout />}>

          {/* / → /dashboard */}
          <Route
            path="/"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* All leads */}
          <Route
            path="/leads"
            element={<Leads />}
          />

          {/* Individual lead */}
          <Route
            path="/leads/:id"
            element={<LeadDetails />}
          />

          {/* Lead conversation */}
          <Route
            path="/leads/:id/conversation"
            element={<Conversation />}
          />

          {/* Lead actions */}
          <Route
            path="/leads/:id/actions"
            element={<Actions />}
          />

        </Route>

        {/* Unknown URL → dashboard */}
        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}