// import { jetKeys } from "@/modules/common/services/query-keys";
import { useInfiniteQuery } from "@tanstack/react-query";

// export const useFetchJets = () => {
//   return useInfiniteQuery({
//     queryKey: jetKeys.list,
//     queryFn: async (pageParams) => {},
//     getNextPageParam(lastPage) {
//       return null;
//     },
//   });
// };

//   manufacturer: varchar('manufacturer', { length: 128 }).notNull(),
//   model: varchar('model', { length: 128 }).notNull(),
//   classification: varchar('classification', { length: 64 }),
//   seats: integer('seats').default(5).notNull(),
//   speed: varchar('speed', { length: 64 }), // e.g. "500kts"
//   range: varchar('range', { length: 64 }), // e.g. "5000 nautical miles"
//   luggageCapacity: varchar('luggage_capacity', { length: 64 }), // e.g. "10 bags"
//   interiorHeight: real('interior_height'), // meters or feet
//   interiorWidth: real('interior_width'), // meters or feet
