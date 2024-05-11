import { ENDPOINTS } from "@/constants/api";
import { API } from "@/lib/utils";
import { BoardType } from "@/types/response/board";
import { CommonResponse } from "@/types/response/common";
import { queryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const getBoards = () => {
  const endpoint = ENDPOINTS.BOARD.DEFAULT;

  return queryOptions<
    AxiosResponse<CommonResponse<BoardType[]>>,
    AxiosResponse,
    CommonResponse<BoardType[]>
  >({
    queryKey: [endpoint],
    queryFn: () => API.get(endpoint),
    select: (data) => data.data,
  });
};
