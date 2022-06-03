export const dedupeArray = (arr: any, element: string) => {
  return arr.filter(
    (v: any, i: any, a: any) =>
      a.findIndex((v2: any) => v2[element] === v[element]) === i
  );
};

/* const dedupedArtistArray = req.body.artists.filter(
    (v: any, i: any, a: any) =>
      a.findIndex(
        (v2: any) => v2.spotify_artist_id === v.spotify_artist_id
      ) === i
  ); */
