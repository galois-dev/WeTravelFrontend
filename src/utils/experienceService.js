import axios from "axios"

// Crud experiences. Put in experience service or keep in 'adventure'?
export async function getExperience(CalPK, pk) { }
export async function createExperience(CalPK, pk, event) { }
export async function updateExperience(CalPK, pk, event) {
  return axios.post(`travels/${CalPK}/calendar/${pk}/`, {
    data: event,
  })
}
export async function deleteExperience(CalPK, pk) {
  return axios.delete(`travels/${CalPK}/calendar/${pk}/`, {
    data: event,
  })
}

// From our wetravel proprietary experience type to 
// the https://antoniandre.github.io/vue-cal/ type
export async function ExpTypeToEventType(experienceList) {
  if (!(experienceList.length > 0)) {
    return []
  }
  let res_list = [];
  for (let i = 0; i < experienceList.length; i++) {
    const experience = experienceList[i];
    let res_em = {}
    const startDate = new Date(experience.time)
    const endDate = new Date(startDate.getTime() + experience.duration * 3600 * 1000)

    res_em["start"] = startDate // getVueCalDateFromJSDate(startDate)
    res_em["end"] = endDate // getVueCalDateFromJSDate(endDate)
    res_em["pk"] = experience.pk
    // Experience has restaurant data
    if (experience.restaurant !== null) {
      res_em["restaurant"] = experience.restaurant
      res_em["title"] = experience.restaurant.name
      res_em["content"] = experience.restaurant.description
      res_em["image"] = experience.restaurant.image
      res_em["type"] = "Restaurant"
    }
    // Experience has activity data instead
    if (experience.activity !== null) {

    }
    console.log(res_em);
    res_list.push(res_em)
  }
  return res_list;
}

export async function EventTypeToExpType(eventList) {
  if (!(eventList.length > 0)) {
    return []
  }

  let res_list = [];
  for (let i = 0; i < eventList.length; i++) {
    const experience = eventList[i];
    let res_em = {}
    const startDate = new Date(experience.start)
    const endDate = new Date(experience.end)
    const calulatedDuration = new Date((endDate.getTime() - startDate.getTime())).getTime() / (3600 * 1000)

    res_em["time"] = new Date(experience.start) // getVueCalDateFromJSDate(startDate)
    res_em["duration"] = calulatedDuration // getVueCalDateFromJSDate(endDate)
    res_em["pk"] = experience.pk
    // Experience has restaurant data - CURRENTLY UNEDITABLE MIGHT RETURN LATER
    if (experience.restaurant !== null) {
      res_em["restaurant"] = experience.restaurant.pk
    }
    // // Experience has activity data instead
    if (!(experience.activity === null || experience.activity === undefined)) {
      res_em["activity"] = experience.activity.pk

    }
    console.log(res_em);
    res_list.push(res_em)
  }
  return res_list;
}


// Wrapping the returned experience into a single event type that the calendar
// can read and edit better.
export class CEventType {
  constructor(EventBuilder) {

  }

  getSaveMap() {
    //Backend aggreable object for updating purposes.

    return {}
  }
}

export let EventBuilder = function () {
  // Build event type param-wise, or from observable objects.
  let params

  return {
    setParams: function (param) {
      this.params = param;
      return this
    }
  }
}

function getVueCalDateFromJSDate(jsDate) {
  return `${jsDate.getFullYear()}-${jsDate.getMonth() + 1}-${jsDate.getDate()} ${jsDate.getHours()}:${jsDate.getMinutes().length > 1 ? jsDate.getMinutes() : '0' + jsDate.getMinutes()}`
}