export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export interface AnalysisRequest {
  image_data: string;
}

export interface AnalysisResponse {
  report_id: string;
  damage_level: string;
  cost_estimate: string;
  parts_affected: string[];
  status: string;
}

export const apiService = {
  async submitAnalysis(data: AnalysisRequest): Promise<AnalysisResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/analysis/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit analysis');
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
  
  async getWorkshops() {
    try {
      const response = await fetch(`${API_BASE_URL}/workshops`);
      if (!response.ok) throw new Error('Failed to fetch workshops');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};
