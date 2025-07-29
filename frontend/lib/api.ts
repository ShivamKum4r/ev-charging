const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:3001/api';</old_str>

export const googleAuth = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/google`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    throw new Error('Google authentication failed');
  }

  return response.json();
};

export class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = API_BASE_URL;
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Auth methods
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: any) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  // Station methods
  async getStations(filters?: any, userLocation?: {lat: number, lng: number}) {
    const params = new URLSearchParams();

    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key]) params.append(key, filters[key]);
      });
    }

    if (userLocation) {
      params.append('location', `${userLocation.lat},${userLocation.lng}`);
    }

    const queryParams = params.toString() ? `?${params.toString()}` : '';
    return this.request(`/stations${queryParams}`);
  }

  async getStation(id: string) {
    return this.request(`/stations/${id}`);
  }

  async createStation(stationData: any) {
    return this.request('/stations', {
      method: 'POST',
      body: JSON.stringify(stationData),
    });
  }

  // Booking methods
  async createBooking(bookingData: any) {
    return this.request('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  async getBookings() {
    return this.request('/bookings');
  }

  async cancelBooking(id: string) {
    return this.request(`/bookings/${id}/cancel`, {
      method: 'PUT',
    });
  }

  // Wallet methods
  async getWallet() {
    return this.request('/wallet');
  }

  async topupWallet(amount: number) {
    return this.request('/wallet/topup', {
      method: 'POST',
      body: JSON.stringify({ amount }),
    });
  }
}

export const apiClient = new ApiClient();