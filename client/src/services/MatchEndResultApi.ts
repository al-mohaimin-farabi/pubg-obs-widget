import apiConfig from "./apiConfig";

const MatchEndResultApi = apiConfig
  .enhanceEndpoints({
    addTagTypes: ["matchEndResult"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getMatchEndResult: builder.query({
        query: ({ matchNumber }: { matchNumber: number }) =>
          `widget-api/${matchNumber}/after-match-score-group`,
        providesTags: (result) =>
          result ? [{ type: "matchEndResult", id: "LIST" }] : [],
      }),
    }),
  });

export const { useGetMatchEndResultQuery } = MatchEndResultApi;

export default MatchEndResultApi;
