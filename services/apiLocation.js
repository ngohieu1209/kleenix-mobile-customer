import axios from "axios"

import { REACT_APP_API_PROVINCE } from '@env'

const apiKey = "zCDIlA5ytRuEe3YS9YrJlzAGjTkxsy4S6mJtq7ZpkGU";

const axiosInstanceLocation = axios.create({
  baseURL: "https://revgeocode.search.hereapi.com/v1",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    apiKey: apiKey,
  },
})

const axiosInstanceAutoComplete = axios.create({
  baseURL: "https://autocomplete.search.hereapi.com/v1",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    apiKey: apiKey,
  },
})

const axiosInstanceProvince = axios.create({
  baseURL: REACT_APP_API_PROVINCE,
  headers: {
    "Content-Type": "application/json",
  },
})

const getLocationFromCoordinates = async (lat, long) => {
  try {
    const {data} = await axiosInstanceLocation.get(`/revgeocode?at=${lat},${long}&lang=vi-VN`)
    if(!data.items) {
      return null
    }
    return data.items
  } catch (error) {
    console.log('winter-api-here-error', error)
  }
}

const getListAutoComplete = async (search) => {
  try {
    const { data } = await axiosInstanceAutoComplete.get(`/autocomplete?q=${search}&limit=10&lang=vi-VN`)
    return data.items;
  } catch (error) {
    console.log('winter-api-here-error', error)
  }
}

const getListProvince = async () => {
  try {
    const { data } = await axiosInstanceProvince.get('/')
    return data.results;
  } catch (error) {
    console.log('winter-api-province-error', error)
  }
}

const getListDistrict = async (provinceId) => {
  try {
    const { data } = await axiosInstanceProvince.get(`/district/${provinceId}`)
    return data.results;
  } catch (error) {
    console.log('winter-api-province-error', error)
  }
}

const getListWard = async (districtId) => {
  try {
    const { data } = await axiosInstanceProvince.get(`/ward/${districtId}`)
    return data.results;
  } catch (error) {
    console.log('winter-api-province-error', error)
  }
}

export { getLocationFromCoordinates, getListAutoComplete, getListDistrict, getListProvince, getListWard}