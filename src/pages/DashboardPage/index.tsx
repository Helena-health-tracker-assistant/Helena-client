import { useState } from "react";
import { CaloriesMenu, GoogleMaps, MeditationMenu, MoodMenu, SleepMenu, WaterMenu } from "../../components";
import LineChart from "../../components/LineChart";
import DashboardLayout from "../../layouts/Dashboard/DashboardLayout";
import { titleCase } from "../../utils/titleCase";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const [nickname, setNickname] = useState<string>("User");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
    }
  }, [location.search]);

  const fetchUserProfile = async () => {
    try {
      const authToken = localStorage.getItem("token");

      if (!authToken) {
        navigate("/home");
        return;
      }

      const response = await fetch("https://group-c-project.onrender.com/v1/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.status == 201) {
        const data = await response.json();
        setNickname(data.data.nickname);
      } else {
        console.error("Failed to fetch user profile:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user profile:");
    }
  };

  return (
    <DashboardLayout
      nickname={titleCase(nickname)}
      chartMenu={<LineChart />}
      caloriesMenu={<CaloriesMenu />}
      sleepMenu={<SleepMenu />}
      stepsMenu={<GoogleMaps />}
      waterMenu={<WaterMenu />}
      meditationMenu={<MeditationMenu />}
      moodMenu={<MoodMenu />}
    />
  );
};

export default DashboardPage;
