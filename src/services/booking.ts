import {
  IdVerificationSchema,
  SurfingExperienceSchema,
  VisitorDetailsSchema,
} from "@/components/form/form-config";
import { DEFAULT_TOKEN, ENDPOINTS } from "@/constants/api";
import { API } from "@/lib/utils";
import dayjs from "dayjs";
import { z } from "zod";

export const convertFormToPayload = ({
  formVisitorDetails,
  formSurfingExperience,
  formIdVerification,
}: {
  formVisitorDetails: z.infer<typeof VisitorDetailsSchema>;
  formSurfingExperience: z.infer<typeof SurfingExperienceSchema>;
  formIdVerification: z.infer<typeof IdVerificationSchema>;
}) => {
  const formData = new FormData();
  formData.append("country_id", formVisitorDetails.country.toString());
  formData.append("board_type_id", formSurfingExperience.board_type.toString());
  formData.append("name", formVisitorDetails.name);
  formData.append("email", formVisitorDetails.email);
  formData.append("whatsapp", formVisitorDetails.whatsapp);
  formData.append(
    "surfing_experience",
    formSurfingExperience.surfing_experience.toString()
  );
  formData.append(
    "visit_date",
    dayjs(formSurfingExperience.visit_date).format("YYYY-MM-DD")
  );
  formData.append("id_card", formIdVerification.id_card);
  return formData;
};

export const createBooking = () => {
  return {
    mutationKey: [ENDPOINTS.BOOKING.DEFAULT],
    mutationFn: ({
      formVisitorDetails,
      formSurfingExperience,
      formIdVerification,
    }: {
      formVisitorDetails: z.infer<typeof VisitorDetailsSchema>;
      formSurfingExperience: z.infer<typeof SurfingExperienceSchema>;
      formIdVerification: z.infer<typeof IdVerificationSchema>;
    }) => {
      const formData = convertFormToPayload({
        formVisitorDetails,
        formSurfingExperience,
        formIdVerification,
      });

      return API.post(ENDPOINTS.BOOKING.DEFAULT, formData, {
        headers: { Authorization: `Bearer ${DEFAULT_TOKEN}` },
      });
    },
  };
};
