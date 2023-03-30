import { Skeleton } from "@mui/material";
import { AntdSkeleton } from "./AntdSkeleton";

export const MuiCustomSkeleton = () => {
  return (
    <Skeleton
      sx={{
        border: `2px solid rgba(26, 173, 131, 0.4 )`,
        borderRadius: `5px`,
        bgcolor: "#FDFDFB",
        padding: `15px 0 0 25px`,
      }}
      variant="rectangular"
      width={964}
      height={191}
    >
      <AntdSkeleton></AntdSkeleton>
    </Skeleton>
  );
};
