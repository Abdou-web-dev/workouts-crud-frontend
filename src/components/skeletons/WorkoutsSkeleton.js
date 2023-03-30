import { LoadingOutlined } from "@ant-design/icons";
import { Pagination, Spin } from "antd";
import { useMediaQuery } from "../../hooks/UseMediaQuery";
import { PrettySpinner } from "../spinners/PrettySpinner";
import { MuiCustomSkeleton } from "./MuiCustomSkeleton";
import "./skeleton_styles.scss";

function WorkoutsSkeleton({ isDesktopScreen }) {
  const is_larger_than_1030px = useMediaQuery("(min-width: 1030px)"); // returns true or false

  if (is_larger_than_1030px)
    return (
      <div className="skeleton-content-not-loaded">
        {isDesktopScreen && (
          <Pagination
            disabled
            className={"pagination-content-not-loaded"}
            total={50}
            showSizeChanger={false}
            style={{ position: "relative", bottom: `30px` }}
          />
        )}

        {/* Mui Skeleton for the container of the workout */}
        <div style={{ position: "relative", bottom: `10px` }}>
          <div style={{ marginBottom: `40px` }}>
            <MuiCustomSkeleton />
          </div>
          <div style={{ marginBottom: `40px` }}>
            <MuiCustomSkeleton />
          </div>
          <div style={{ marginBottom: `40px` }}>
            <MuiCustomSkeleton />
          </div>
          <div style={{ marginBottom: `40px` }}>
            <MuiCustomSkeleton />
          </div>
        </div>
        <Spin
          className="spinner"
          style={{ marginBottom: `0px` }}
          spinning={true}
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 50,
              }}
            />
          }
        />
      </div>
    );
  else
    return (
      <>
        <div className="pretty-spinner-container">
          <span>Wait</span>

          <div className="pretty-spinner-wrapper">
            <PrettySpinner></PrettySpinner>
          </div>
        </div>
      </>
    );
}

export default WorkoutsSkeleton;
