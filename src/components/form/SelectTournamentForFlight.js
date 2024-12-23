import React, { useState, useEffect } from "react";
import TournamentServices from "../../services/TournamentServices";
import useAsync from "hooks/useAsync";

const SelectTournamentForFlight = ({ tournamentId, setPlayers }) => {
  const { data: players, loading } = useAsync(
    () => TournamentServices.getPlayers(tournamentId),
    [tournamentId]
  );

  useEffect(() => {
    if (players) {
      setPlayers(players.data);
    }
  }, [players]);

  return null; // This component doesn't render anything, it only fetches data.
};

export default SelectTournamentForFlight;
