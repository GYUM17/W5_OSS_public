const API_BASE_URL = 'https://68db330423ebc87faa323a9f.mockapi.io';

// API 서비스 함수들
export const employeeAPI = {
  // 모든 직원 데이터 가져오기
  async getAllEmployees() {
    try {
      const response = await fetch(`${API_BASE_URL}/employeesData`);
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }
  },

  // 새 직원 추가
  async createEmployee(employeeData) {
    try {
      const response = await fetch(`${API_BASE_URL}/employeesData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });
      if (!response.ok) {
        throw new Error('Failed to create employee');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating employee:', error);
      throw error;
    }
  },

  // 직원 정보 수정
  async updateEmployee(id, employeeData) {
    try {
      const response = await fetch(`${API_BASE_URL}/employeesData/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });
      if (!response.ok) {
        throw new Error('Failed to update employee');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating employee:', error);
      throw error;
    }
  },

  // 직원 삭제
  async deleteEmployee(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/employeesData/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting employee:', error);
      throw error;
    }
  },
};
