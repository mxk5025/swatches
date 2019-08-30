import axios from 'axios';

const apiUrl = 'https://api.color.pizza/v1/';

export default class ColorUtil {

  async get(url) {
    try {
      return await axios.get(url);
    } catch (error) {
      console.log(error);
    }
  }

  getAllColors() {
    return this.get(apiUrl);
  }

  async getColor(hex) {
    hex = hex.startsWith('#') ? hex.slice(1) : hex;
    const res = await this.get(apiUrl + hex);
    return res.data;
  }

}
