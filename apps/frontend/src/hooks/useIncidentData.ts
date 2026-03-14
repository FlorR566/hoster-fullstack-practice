import { useState, useEffect, useCallback } from 'react';
import { getAllIncidents } from '../api/incidentApi';

export const useIncidentData = () => {
  const [incidents, setIncidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIncidents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllIncidents();
      setIncidents(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIncidents();
  }, [fetchIncidents]);

  const refresh = fetchIncidents;

  return { incidents, loading, error, refresh };
};