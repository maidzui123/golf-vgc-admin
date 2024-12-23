import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { Modal, ModalBody, ModalFooter, Button } from "@windmill/react-ui";
import { FiTrash2 } from "react-icons/fi";

import CustomerServices from "services/CustomerServices";
import AdminServices from "services/AdminServices";
import CouponServices from "services/CouponServices";
import ProductServices from "services/ProductServices";
import CategoryServices from "services/CategoryServices";
import { SidebarContext } from "context/SidebarContext";
import { notifySuccess, notifyError } from "utils/toast";
import useToggleDrawer from "hooks/useToggleDrawer";

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

/** TODO: MAINMODAL IMPORT */

const MainModal = ({ id, title }) => {
  const { isModalOpen, closeModal, setIsUpdate } = useContext(SidebarContext);
  const { setServiceId } = useToggleDrawer();
  const location = useLocation();

  const handleDelete = () => {
    if (location.pathname === "/products") {
      ProductServices.deleteProduct(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }

    if (location.pathname === "/category") {
      CategoryServices.deleteCategory(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/customers") {
      CustomerServices.deleteCustomer(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }

    if (location.pathname === "/coupons") {
      CouponServices.deleteCoupon(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/our-staff") {
      AdminServices.deleteStaff(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }

    if (location.pathname === "/students") {
      StudentServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/citys") {
      CityServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/careers") {
      CareerServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/tickRequests") {
      TickRequestServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/tees") {
      TeeServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/events") {
      EventServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/customerEvents") {
      CustomerEventServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }

    if (location.pathname === "/travels") {
      TravelServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/friends") {
      FriendServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/notifications") {
      NotificationServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/courses") {
      CourseServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/customertournaments") {
      CustomerTournamentServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/clubs") {
      ClubServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/customerClubs") {
      CustomerClubServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/customerTravels") {
      CustomerTravelServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/clubPosts") {
      ClubPostServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/clubComments") {
      ClubCommentServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/paymentMethods") {
      PaymentMethodServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/rewards") {
      RewardServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/customerRewards") {
      CustomerRewardServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/clubReports") {
      ClubReportServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/newss") {
      NewsServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/banners") {
      BannerServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/pages") {
      PageServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/meetingRequests") {
      MeetingRequestServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/levels") {
      LevelServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/benefits") {
      BenefitServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/chats") {
      ChatServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/flights") {
      FlightServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/ratings") {
      RatingServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/feedbacks") {
      FeedbackServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/customerTournamentFavourites") {
      CustomerTournamentFavouriteServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/payments") {
      PaymentServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/reportNames") {
      ReportNameServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/locationClubs") {
      LocationClubServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/searchKeywords") {
      SearchKeywordServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/chatGroups") {
      ChatGroupServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/tournamentMedias") {
      TournamentMediaServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/calendars") {
      CalendarServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/customerLocations") {
      CustomerLocationServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/tournamentMediasDrives") {
      TournamentMediasDriveServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/sensitiveWords") {
      SensitiveWordServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/flightResults") {
      FlightResultServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/favoriteTravels") {
      FavoriteTravelServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    if (location.pathname === "/icons") {
      IconServices.deleteOne(id)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeModal();
      setServiceId();
    }
    /** TODO: MAINMODAL */
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalBody className="text-center custom-modal px-8 pt-6 pb-4">
          <span className="flex justify-center text-3xl mb-6 text-red-500">
            <FiTrash2 />
          </span>
          <h2 className="text-xl font-medium mb-1">
            Are You Sure! Want to Delete{" "}
            <span className="text-red-500">{title}</span> Record?
          </h2>
          <p>
            Do you really want to delete these records? You can't view this in
            your list anymore if you delete!
          </p>
        </ModalBody>
        <ModalFooter className="justify-center">
          <Button
            className="w-full sm:w-auto hover:bg-white hover:border-gray-50"
            layout="outline"
            onClick={closeModal}
          >
            No, Keep It
          </Button>
          <Button onClick={handleDelete} className="w-full sm:w-auto">
            Yes, Delete It
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default React.memo(MainModal);
