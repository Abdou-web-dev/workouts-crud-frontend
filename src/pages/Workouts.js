import { BackTop, Pagination } from "antd";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
// components
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { useContext, useEffect, useState } from "react";
import { backend_uri } from "../App";
import { WorkoutsForm } from "../components/forms/WorkoutsForm";
import {
  RightArrow as NextIcon,
  LeftArrow as PrevIcon,
} from "../components/icons/Icons";
import { EmptyList } from "../components/lists/EmptyList";
import { WorkoutsSection } from "../components/sections/WorkoutsSection";
import WorkoutsSkeleton from "../components/skeletons/WorkoutsSkeleton";
import { MainVariablesContext } from "../context/MainVariablesContext";
import { useMediaQuery } from "../hooks/UseMediaQuery";
import { useAuthContext } from "../hooks/useAuthContext";
import "./pages_styles.scss";

const Workouts = ({}) => {
  // let workoutsList = workouts?.map((workout) => workout._id);
  //instead of adding workouts object down to child components as props, I can use this hook in each component that needs workouts
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  let intialClassName = `workout-details-container-as-list`;
  const [filteredResults, setFilteredResults] = React.useState([]);
  const [showAllExistentWorkouts, setshowAllExistentWorkouts] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [displayPagination, setDisplayPagination] = useState("");
  const [detailsContClass, setdetailsContClass] = useState(intialClassName); //this className state var is being passed as props to children
  const [movePaginationFromBottom, setmovePaginationFromBottom] =
    useState("220px");
  const [paginationClassName, setpaginationClassName] = useState(
    "pagination-content-loaded"
  );
  const [showMobileFormModal, setShowMobileFormModal] = useState(false);

  const { openSearchInputModal, setopenSearchInputModal } =
    useContext(MainVariablesContext);

  const [filterBtnClicked, setfilterBtnClicked] = useState(false);
  let layoutGrid = detailsContClass === "workout-details-container-as-grid";
  let layoutList = detailsContClass === "workout-details-container-as-list";

  const isDesktopScreen = useMediaQuery("(min-width: 1350px)"); // returns true or false
  // const isLargeScreen = useMediaQuery("(min-width: 1250px)"); // returns true or false
  const isMobileScreen = useMediaQuery("(max-width: 800px)"); // returns true or false
  const isTabletScreen = useMediaQuery(
    "(min-width: 992px) and (max-width: 1250px)"
  ); // returns true or false

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`${backend_uri}/api/workouts/`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };
    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (currentPage === 10 && layoutList) {
      setmovePaginationFromBottom("0px");
    } else if (currentPage !== 10 && layoutList) {
      setmovePaginationFromBottom("120px");
    } else if (
      (layoutList && searchInput?.length > 0) ||
      (layoutGrid && searchInput?.length > 0)
    ) {
      setmovePaginationFromBottom("550px");
    }
    if (isMobileScreen) {
      setdetailsContClass(`workout-details-container-as-grid`);
    } else if (!isMobileScreen) {
      if (layoutList) setdetailsContClass(`workout-details-container-as-list`);
      if (layoutGrid) setdetailsContClass(`workout-details-container-as-grid`);
    }
    if (workouts) {
      console.log(Array.isArray(workouts), workouts.length);
    }
  }, [
    searchInput,
    currentPage,
    layoutList,
    layoutGrid,
    showAllExistentWorkouts,
    isMobileScreen,
    workouts,
  ]);

  if (user !== null) {
    if (!workouts) {
      return (
        <>
          <WorkoutsSkeleton {...{ isDesktopScreen }} />
        </>
      );
    } else if (workouts) {
      return (
        <>
          <div className="workouts-page-container">
            {workouts?.length ? (
              <div className="workouts-main-section">
                {/* Workouts List */}
                <WorkoutsSection
                  {...{
                    workouts,
                    currentPage,
                    setmovePaginationFromBottom,
                    setpaginationClassName,
                    searchInput,
                    setSearchInput,
                    setCurrentPage,
                    displayPagination,
                    setDisplayPagination,
                    detailsContClass,
                    setdetailsContClass,
                    filteredResults,
                    setFilteredResults,
                    showAllExistentWorkouts,
                    setshowAllExistentWorkouts,
                    showMobileFormModal,
                    openSearchInputModal,
                    setopenSearchInputModal,
                    filterBtnClicked,
                    setfilterBtnClicked,
                  }}
                ></WorkoutsSection>
              </div>
            ) : (
              <div>
                <EmptyList />
              </div>
            )}

            <div
              className={
                showAllExistentWorkouts
                  ? "workouts-main-form form-3rd-section"
                  : "workouts-main-form"
              }
              style={{ height: isMobileScreen ? `80px` : "" }}
            >
              <div>
                {/* Workouts Form */}
                <WorkoutsForm
                  {...{
                    workouts,
                    paginationClassName,
                    showAllExistentWorkouts,
                    setCurrentPage,
                    showMobileFormModal,
                    setShowMobileFormModal,
                    openSearchInputModal,
                    filterBtnClicked,
                  }}
                />
              </div>
            </div>

            <BackTop />
          </div>

          {/* pagination of Workouts  , with the pages' numbers */}
          {/* display the pagination only if there are some workouts  */}
          {workouts.length !== 0 ? (
            <>
              {searchInput?.length === 0 && !showAllExistentWorkouts && (
                <Pagination
                  className={`${paginationClassName} ${
                    isTabletScreen && layoutGrid
                      ? `pagination-content-loaded-grid-to-bottom`
                      : ""
                  }`}
                  prevIcon={
                    paginationClassName === "pagination-content-loaded-grid" ? (
                      <PrevIcon />
                    ) : (
                      <LeftOutlined />
                    )
                  }
                  nextIcon={
                    paginationClassName === "pagination-content-loaded-grid" ? (
                      <NextIcon />
                    ) : (
                      <RightOutlined />
                    )
                  }
                  style={{
                    border:
                      paginationClassName === "pagination-content-loaded-grid"
                        ? ""
                        : `1px solid lightgray`,
                    padding:
                      paginationClassName === "pagination-content-loaded-grid"
                        ? "10px 0"
                        : `50px 0`,
                    position: "relative",
                    bottom: movePaginationFromBottom,
                    display: displayPagination,
                    justifyContent: "center",
                  }}
                  total={
                    workouts?.length > 0 && workouts?.length <= 10
                      ? 30 //3 pages
                      : workouts?.length >= 10 && workouts?.length <= 20
                      ? 60 //6 pages
                      : workouts?.length >= 20 && workouts?.length <= 30
                      ? 90
                      : workouts?.length >= 30 && workouts?.length <= 40
                      ? 120
                      : workouts?.length >= 40 && workouts?.length <= 50
                      ? 150
                      : workouts?.length >= 50 && workouts?.length <= 60
                      ? 180
                      : 250
                  }
                  // total={200} //200 means 20 page
                  current={currentPage}
                  onChange={(page, e) => {
                    setCurrentPage(page);
                  }}
                  showSizeChanger={false}
                  showQuickJumper
                />
              )}
            </>
          ) : null}
        </>
      );
    }
  }
};

export default Workouts;
