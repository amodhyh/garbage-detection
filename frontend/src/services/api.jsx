
const postData = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

    try {
      
      const response = await fetch('http://localhost:8089/classify', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  export{ postData };