import { Button, Modal, ModalBody, ModalFooter } from "@windmill/react-ui";
import React, { useContext } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useLocation } from "react-router-dom";

import StudentServices from "../../services/StudentServices";
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
import ChatServices from "../../services/ChatServices";
import FlightServices from "../../services/FlightServices";
import MeetingRequestServices from "../../services/MeetingRequestServices";
import LevelServices from "../../services/LevelServices";
import BenefitServices from "../../services/BenefitServices";
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
/** TODO: DELETEMODAL IMPORT */

























//internal import
import spinnerLoadingImage from "assets/img/spinner.gif";
import { SidebarContext } from "context/SidebarContext";
import AdminServices from "services/AdminServices";
import CategoryServices from "services/CategoryServices";
import CouponServices from "services/CouponServices";
import CustomerServices from "services/CustomerServices";
import LanguageServices from "services/LanguageServices";
import ProductServices from "services/ProductServices";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import useToggleDrawer from "hooks/useToggleDrawer";
import AttributeServices from "services/AttributeServices";
import CurrencyServices from "services/CurrencyServices";
import { notifyError, notifySuccess } from "utils/toast";

const DeleteModal = ({ id, ids, setIsCheck, category, title, useParamId, pageId, currentTable}) => {
  const { isModalOpen, closeModal, setIsUpdate } = useContext(SidebarContext);
  const { setServiceId } = useToggleDrawer();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleDelete = async () => {
    // return notifyError("CRUD operation is disabled for this option!");
    try {
      setIsSubmitting(true);
      if (location.pathname === "/products") {
        if (ids) {
          const res = await ProductServices.deleteManyProducts({
            ids: ids,
          });
          setIsUpdate(true);
          notifySuccess(t(res.message));
          setIsCheck([]);
          setServiceId();
          closeModal();
          setIsSubmitting(false);
        } else {
          const res = await ProductServices.deleteProduct(id);
          setIsUpdate(true);
          notifySuccess(t(res.message));
          setServiceId();
          closeModal();
          setIsSubmitting(false);
        }
      }

      if (location.pathname === "/coupons") {
        if (ids) {
          const res = await CouponServices.deleteManyCoupons({
            ids: ids,
          });
          setIsUpdate(true);
          notifySuccess(t(res.message));
          setIsCheck([]);
          setServiceId();
          closeModal();
          setIsSubmitting(false);
        } else {
          const res = await CouponServices.deleteCoupon(id);
          setIsUpdate(true);
          notifySuccess(t(res.message));
          setServiceId();
          closeModal();
          setIsSubmitting(false);
        }
      }

      if (location.pathname === "/categories" || category) {
        if (ids) {
          //  console.log('delete modal categorices',ids)
          const res = await CategoryServices.deleteManyCategory({
            ids: ids,
          });
          //  console.log('delete many category res',res)
          setIsUpdate(true);
          notifySuccess(t(res.message));
          setIsCheck([]);
          setServiceId();
          closeModal();
          setIsSubmitting(false);
        } else {
          if (id === undefined || !id) {
            notifyError("Please select a category first!");
            setIsSubmitting(false);
            return closeModal();
          }
          // console.log('delete modal open',id)
          const res = await CategoryServices.deleteCategory(id);
          setIsUpdate(true);
          notifySuccess(t(res.message));
          closeModal();
          setServiceId();
          setIsSubmitting(false);
        }
      } else if (
        location.pathname === `/categories/${useParamId}` ||
        category
      ) {
        // console.log('delete modal ')
        if (id === undefined || !id) {
          notifyError("Please select a category first!");
          setIsSubmitting(false);
          return closeModal();
        }

        const res = await CategoryServices.deleteCategory(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setServiceId();
        setIsSubmitting(false);
      }

      if (location.pathname === "/customers") {
        const res = await CustomerServices.deleteCustomer(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setServiceId();
        closeModal();
        setIsSubmitting(false);
      }

      if (location.pathname === "/attributes") {
        if (ids) {
          const res = await AttributeServices.deleteManyAttribute({
            ids: ids,
          });
          setIsUpdate(true);
          notifySuccess(t(res.message));
          setIsCheck([]);
          setServiceId();
          closeModal();
          setIsSubmitting(false);
        } else {
          const res = await AttributeServices.deleteAttribute(id);
          setIsUpdate(true);
          notifySuccess(t(res.message));
          setServiceId();
          closeModal();
          setIsSubmitting(false);
        }
      }

      if (
        location.pathname === `/attributes/${location.pathname.split("/")[2]}`
      ) {
        if (ids) {
          const res = await AttributeServices.deleteManyChildAttribute({
            id: location.pathname.split("/")[2],
            ids: ids,
          });
          setIsUpdate(true);
          notifySuccess(t(res.message));
          setServiceId();
          setIsCheck([]);
          closeModal();
          setIsSubmitting(false);
        } else {
          console.log("att value delete", id, location.pathname.split("/")[2]);

          const res = await AttributeServices.deleteChildAttribute({
            id: id,
            ids: location.pathname.split("/")[2],
          });
          setIsUpdate(true);
          notifySuccess(t(res.message));
          setServiceId();
          closeModal();
          setIsSubmitting(false);
        }
      }

      if (location.pathname === "/our-staff") {
        const res = await AdminServices.deleteStaff(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setServiceId();
        closeModal();
        setIsSubmitting(false);
      }

      if (location.pathname === "/languages") {
        if (ids) {
          const res = await LanguageServices.deleteManyLanguage({
            ids: ids,
          });
          setIsUpdate(true);
          notifySuccess(t(res.message));
          setIsCheck([]);
          closeModal();
          setIsSubmitting(false);
        } else {
          const res = await LanguageServices.deleteLanguage(id);
          setIsUpdate(true);
          notifySuccess(t(res.message));
          setServiceId();
          closeModal();
          setIsSubmitting(false);
        }
      }

      if (location.pathname === "/currencies") {
        if (ids) {
          const res = await CurrencyServices.deleteManyCurrency({
            ids: ids,
          });
          setIsUpdate(true);
          notifySuccess(t(res.message));
          setIsCheck([]);
          closeModal();
          setIsSubmitting(false);
        } else {
          const res = await CurrencyServices.deleteCurrency(id);
          setIsUpdate(true);
          notifySuccess(t(res.message));
          setServiceId();
          closeModal();
          setIsSubmitting(false);
        }
      }
    } catch (err) {
      notifyError(err ? err?.response?.data?.message : err?.message);
      setServiceId();
      setIsCheck([]);
      closeModal();
      setIsSubmitting(false);
    }
    if (location.pathname === "/events") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await EventServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await EventServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/customerEvents") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await CustomerEventServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await CustomerEventServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/tournaments") {
      // Check if 'ids' variable is defined
      if (ids) {
        console.log("delete many tournament", ids);
        const res = await TournamentServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await TournamentServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }



    if (location.pathname === "/travels") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await TravelServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await TravelServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/friends") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await FriendServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await FriendServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/notifications") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await NotificationServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await NotificationServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/courses") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await CourseServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await CourseServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/customertournaments") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await CustomerTournamentServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await CustomerTournamentServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/clubs") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await ClubServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await ClubServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/customerClubs") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await CustomerClubServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await CustomerClubServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }
    if (location.pathname === "/customerTravels") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await CustomerTravelServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await CustomerTravelServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }


    if (location.pathname === "/") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await StudentServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        setServiceId();
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await StudentServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setServiceId();
        closeModal();
        setIsSubmitting(false);
      }
    }
    if (location.pathname === "/citys") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await CityServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await CityServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/careers") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await CareerServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await CareerServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/tickRequests") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await TickRequestServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await TickRequestServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/tees") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await TeeServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await TeeServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/clubPosts") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await ClubPostServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await ClubPostServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/clubComments") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await ClubCommentServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await ClubCommentServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/rewards") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await RewardServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await RewardServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/customerRewards") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await CustomerRewardServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await CustomerRewardServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/clubReports") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await ClubReportServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await ClubReportServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/newss") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await NewsServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await NewsServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/banners") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await BannerServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await BannerServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/pages") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await PageServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await PageServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/chats") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await ChatServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await ChatServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }
    if (location.pathname === `/event/${pageId}`) {
        const res = await CustomerEventServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
    }
    if (location.pathname === `/travel/${pageId}`) {
      const res = await CustomerTravelServices.deleteOne(id);
      setIsUpdate(true);
      notifySuccess(t(res.message));
      closeModal();
      setIsSubmitting(false);
  }
    if (location.pathname === `/tournament/${pageId}`) {
      if(currentTable == "flight") {
        const res = await FlightServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
      if(currentTable == "FlightResult") {
        const res = await FlightResultServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
      if(currentTable == "tournamentCustomer") 
      {
        const res = await CustomerTournamentServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/meetingRequests") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await MeetingRequestServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await MeetingRequestServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/levels") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await LevelServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await LevelServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/benefits") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await BenefitServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await BenefitServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/ratings") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await RatingServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await RatingServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/feedbacks") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await FeedbackServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await FeedbackServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/customerTournamentFavourites") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await CustomerTournamentFavouriteServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await CustomerTournamentFavouriteServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/payments") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await PaymentServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await PaymentServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/reportNames") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await ReportNameServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await ReportNameServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/locationClubs") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await LocationClubServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await LocationClubServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/searchKeywords") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await SearchKeywordServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await SearchKeywordServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/chatGroups") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await ChatGroupServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await ChatGroupServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/tournamentMedias") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await TournamentMediaServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await TournamentMediaServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/calendars") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await CalendarServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await CalendarServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/customerLocations") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await CustomerLocationServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await CustomerLocationServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/tournamentMediasDrives") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await TournamentMediasDriveServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await TournamentMediasDriveServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/sensitiveWords") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await SensitiveWordServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await SensitiveWordServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/flightResults") {
  // Check if 'ids' variable is defined
  if (ids) {
    const res = await FlightResultServices.deleteMany({
      ids: ids,
    });
    setIsUpdate(true);
    notifySuccess(t(res.message));
    setIsCheck([]);
    closeModal();
    setIsSubmitting(false);
  } else {
    const res = await FlightResultServices.deleteOne(id);
    setIsUpdate(true);
    notifySuccess(t(res.message));
    closeModal();
    setIsSubmitting(false);
  }
}

if (location.pathname === "/favoriteTravels") {
  // Check if 'ids' variable is defined
  if (ids) {
    const res = await FavoriteTravelServices.deleteMany({
      ids: ids,
    });
    setIsUpdate(true);
    notifySuccess(t(res.message));
    setIsCheck([]);
    closeModal();
    setIsSubmitting(false);
  } else {
    const res = await FavoriteTravelServices.deleteOne(id);
    setIsUpdate(true);
    notifySuccess(t(res.message));
    closeModal();
    setIsSubmitting(false);
  }
}

if (location.pathname === "/icons") {
  // Check if 'ids' variable is defined
  if (ids) {
    const res = await IconServices.deleteMany({
      ids: ids,
    });
    setIsUpdate(true);
    notifySuccess(res.message);
    setIsCheck([]);
    closeModal();
    setIsSubmitting(false);
  } else {
    const res = await IconServices.deleteOne(id);
    setIsUpdate(true);
    notifySuccess(res.message);
    closeModal();
    setIsSubmitting(false);
  }
}

/** TODO: DELETEMODAL */

























    if (location.pathname === "/paymentMethods") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await PaymentMethodServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await PaymentMethodServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/rewards") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await RewardServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await RewardServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    if (location.pathname === "/customerRewards") {
      // Check if 'ids' variable is defined
      if (ids) {
        const res = await CustomerRewardServices.deleteMany({
          ids: ids,
        });
        setIsUpdate(true);
        notifySuccess(t(res.message));
        setIsCheck([]);
        closeModal();
        setIsSubmitting(false);
      } else {
        const res = await CustomerRewardServices.deleteOne(id);
        setIsUpdate(true);
        notifySuccess(t(res.message));
        closeModal();
        setIsSubmitting(false);
      }
    }

    /** TODO: DELETEMODAL */
  };

  const { t } = useTranslation();

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalBody className="text-center custom-modal px-8 pt-6 pb-4">
          <span className="flex justify-center text-3xl mb-6 text-red-500">
            <FiTrash2 />
          </span>
          {/* <h2 className="text-xl font-medium mb-1">{t('DeleteModalH2')}</h2> */}
          <h2 className="text-xl font-medium mb-2">
            {t("DeleteModalH2")} <span className="text-red-500">{title}</span>?
          </h2>
          <p>{t("DeleteModalPtag")}</p>
        </ModalBody>

        <ModalFooter className="justify-center">
          <Button
            className="w-full sm:w-auto hover:bg-white hover:border-gray-50"
            layout="outline"
            onClick={closeModal}
          >
            {t("modalKeepBtn")}
          </Button>
          <div className="flex justify-end">
            {isSubmitting ? (
              <Button
                disabled={true}
                type="button"
                className="w-full h-12 sm:w-auto"
              >
                <img
                  src={spinnerLoadingImage}
                  alt="Loading"
                  width={20}
                  height={10}
                />{" "}
                <span className="font-serif ml-2 font-light">
                  {t("Processing")}
                </span>
              </Button>
            ) : (
              <Button onClick={handleDelete} className="w-full h-12 sm:w-auto">
                {t("modalDeletBtn")}
              </Button>
              // <button
              //   type="submit"
              //   className="text-sm mt-6 leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-white px-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white bg-green-400 hover:bg-green-500 h-10"
              // >
              //   Park Order
              // </button>
            )}
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default React.memo(DeleteModal);
