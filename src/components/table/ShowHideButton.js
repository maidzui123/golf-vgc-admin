import React, { useContext } from "react";
import Switch from "react-switch";
import { useLocation } from "react-router-dom";

//internal import
import { SidebarContext } from "context/SidebarContext";
import AttributeServices from "services/AttributeServices";
import CategoryServices from "services/CategoryServices";
import CouponServices from "services/CouponServices";
import CurrencyServices from "services/CurrencyServices";
import LanguageServices from "services/LanguageServices";
import ProductServices from "services/ProductServices";
import { notifyError, notifySuccess } from "utils/toast";

import CityServices from "../../services/CityServices";

import CareerServices from "../../services/CareerServices";

import TickRequestServices from "../../services/TickRequestServices";

import TeeServices from "../../services/TeeServices";

import EventServices from "../../services/EventServices";

import CustomerEventServices from "../../services/CustomerEventServices";

import TournamentServices from "../../services/TournamentServices";

import TravelServices from "../../services/TravelServices";

import FriendServices from "../../services/FriendServices";

import NotificationServices from "../../services/NotificationServices";

import CourseServices from "../../services/CourseServices";

import CustomerTournamentServices from "../../services/CustomerTournamentServices";

import ClubServices from "../../services/ClubServices";

import CustomerClubServices from "../../services/CustomerClubServices";

import CustomerTravelServices from "../../services/CustomerTravelServices";

import ClubPostServices from "../../services/ClubPostServices";

import ClubCommentServices from "../../services/ClubCommentServices";

import PaymentMethodServices from "../../services/PaymentMethodServices";
import RewardServices from "../../services/RewardServices";

import CustomerRewardServices from "../../services/CustomerRewardServices";

import ClubReportServices from "../../services/ClubReportServices";

import NewsServices from "../../services/NewsServices";

import BannerServices from "../../services/BannerServices";

import PageServices from "../../services/PageServices";

import MeetingRequestServices from "../../services/MeetingRequestServices";

import LevelServices from "../../services/LevelServices";

import BenefitServices from "../../services/BenefitServices";

import ChatServices from "../../services/ChatServices";

import FlightServices from "../../services/FlightServices";

import RatingServices from "../../services/RatingServices";

import FeedbackServices from "../../services/FeedbackServices";

import CustomerTournamentFavouriteServices from "../../services/CustomerTournamentFavouriteServices";

import PaymentServices from "../../services/PaymentServices";

import ReportNameServices from "../../services/ReportNameServices";

import LocationClubServices from "../../services/LocationClubServices";

import SearchKeywordServices from "../../services/SearchKeywordServices";

import ChatGroupServices from "../../services/ChatGroupServices";

import TournamentMediaServices from "../../services/TournamentMediaServices";

import CalendarServices from "../../services/CalendarServices";

import CustomerLocationServices from "../../services/CustomerLocationServices";

import TournamentMediasDriveServices from "../../services/TournamentMediasDriveServices";

import SensitiveWordServices from "../../services/SensitiveWordServices";

import FlightResultServices from "../../services/FlightResultServices";

import FavoriteTravelServices from "../../services/FavoriteTravelServices";

import IconServices from "../../services/IconServices";

/** TODO: SHOWHIDEBUTTON IMPORT */
const ShowHideButton = ({ id, status, category, currencyStatusName, setStatus }) => {
    const location = useLocation();
    const { setIsUpdate } = useContext(SidebarContext);
    const handleChangeStatus = async (id) => {
        let newStatus;
        try {
            if (status === "show") {
                newStatus = "hide";
            } else {
                newStatus = "show";
            }
            

            if (location.pathname === "/categories" || category) {
                const res = await CategoryServices.updateStatus(id, {
                    status: newStatus,
                });
                setIsUpdate(true);
                notifySuccess(res.message);
            }

            if (location.pathname === "/products") {
                const res = await ProductServices.updateStatus(id, {
                    status: newStatus,
                });
                setIsUpdate(true);
                notifySuccess(res.message);
            }

            if (location.pathname === "/languages") {
                const res = await LanguageServices.updateStatus(id, {
                    status: newStatus,
                });
                setIsUpdate(true);
                notifySuccess(res.message);
            }
            if (location.pathname === "/currencies") {
                if (currencyStatusName === "status") {
                    const res = await CurrencyServices.updateEnabledStatus(id, {
                        status: newStatus,
                    });
                    setIsUpdate(true);
                    notifySuccess(res.message);
                } else {
                    const res = await CurrencyServices.updateLiveExchangeRateStatus(id, {
                        live_exchange_rates: newStatus,
                    });
                    setIsUpdate(true);
                    notifySuccess(res.message);
                }
            }

            if (location.pathname === "/attributes") {
                const res = await AttributeServices.updateStatus(id, {
                    status: newStatus,
                });
                setIsUpdate(true);
                notifySuccess(res.message);
            }

            if (
                location.pathname === `/attributes/${location.pathname.split("/")[2]}`
            ) {
                const res = await AttributeServices.updateChildStatus(id, {
                    status: newStatus,
                });
                setIsUpdate(true);
                notifySuccess(res.message);
            }

            if (location.pathname === "/coupons") {
                // console.log('coupns',id)
                const res = await CouponServices.updateStatus(id, {
                    status: newStatus,
                });
                setIsUpdate(true);
                notifySuccess(res.message);
            }

            if (location.pathname === "/our-staff") {
                // console.log('coupns',id)
                const res = await CouponServices.updateStaffStatus(id, {
                    status: newStatus,
                });
                setIsUpdate(true);
                notifySuccess(res.message);
            }
            if (location.pathname === "/citys") {
                CityServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/careers") {
                CareerServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/tickRequests") {
                TickRequestServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/tees") {
                TeeServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/events") {
                EventServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/customerEvents") {
                CustomerEventServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/tournaments") {
                TournamentServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }

            if (location.pathname === "/travels") {
                TravelServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/friends") {
                FriendServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/notifications") {
                NotificationServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/courses") {
                CourseServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/customertournaments") {
                CustomerTournamentServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/clubs") {
                ClubServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/customerClubs") {
                CustomerClubServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/customerTravels") {
                CustomerTravelServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/clubPosts") {
                ClubPostServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/clubComments") {
                ClubCommentServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/paymentMethods") {
                PaymentMethodServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/rewards") {
                RewardServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/customerRewards") {
                CustomerRewardServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/clubReports") {
                ClubReportServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/newss") {
                NewsServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/banners") {
                BannerServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setStatus(res.status)
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/pages") {
                PageServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/meetingRequests") {
                MeetingRequestServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/levels") {
                LevelServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/benefits") {
                BenefitServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/chats") {
                ChatServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/flights") {
                FlightServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/ratings") {
                RatingServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/feedbacks") {
                FeedbackServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/customerTournamentFavourites") {
                CustomerTournamentFavouriteServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/payments") {
                PaymentServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/reportNames") {
                ReportNameServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/locationClubs") {
                LocationClubServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/tournamentMedias") {
                TournamentMediaServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/searchKeywords") {
                SearchKeywordServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/chatGroups") {
                ChatGroupServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/calendars") {
                CalendarServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
            if (location.pathname === "/customerLocations") {
                CustomerLocationServices.updateStatus(id, { status: newStatus })
                    .then((res) => {
                        setIsUpdate(true);
                        notifySuccess(res.message);
                    })
                    .catch((err) => notifyError(err.message));
            }
              if (location.pathname === "/tournamentMediasDrives") {
      TournamentMediasDriveServices.updateStatus(id, { status: newStatus })
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
    }
  if (location.pathname === "/sensitiveWords") {
      SensitiveWordServices.updateStatus(id, { status: newStatus })
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
    }
  if (location.pathname === "/flightResults") {
      FlightResultServices.updateStatus(id, { status: newStatus })
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
    }
  if (location.pathname === "/favoriteTravels") {
      FavoriteTravelServices.updateStatus(id, { status: newStatus })
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
    }
  if (location.pathname === "/icons") {
      IconServices.updateStatus(id, { status: newStatus })
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
    }
/** TODO: SHOWHIDEBUTTON*/
        } catch (err) {
            notifyError(err ? err?.response?.data?.message : err?.message);
        }
    };

    return (
        <Switch
            onChange={() => handleChangeStatus(id)}
            checked={status === "show" ? true : false}
            className="react-switch md:ml-0"
            uncheckedIcon={
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        height: "100%",
                        width: 120,
                        fontSize: 14,
                        color: "white",
                        paddingRight: 22,
                        paddingTop: 1,
                    }}
                ></div>
            }
            width={30}
            height={15}
            handleDiameter={13}
            offColor="#E53E3E"
            onColor={"#2F855A"}
            checkedIcon={
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: 73,
                        height: "100%",
                        fontSize: 14,
                        color: "white",
                        paddingLeft: 20,
                        paddingTop: 1,
                    }}
                ></div>
            }
        />
    );
};

export default ShowHideButton;
