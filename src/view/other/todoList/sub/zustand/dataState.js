import { create } from 'zustand'
import { v4 as uuid } from 'uuid'

const useOptionsState = create(set => ({
  setTransOptions: (dataList, idName, labelName) => dataList.map(cur => ({
    id: cur[idName],
    name: cur[labelName],
  })),

  members: [{
    name: 'Vivi',
    imgUrl: 'https://picsum.photos/id/237/200/300',
  }, {
    name: 'Travis',
    imgUrl: 'https://picsum.photos/id/338/200/300',
  }, {
    name: 'Cindy',
    imgUrl: 'https://picsum.photos/id/399/200/300',
  }, {
    name: 'Agnes',
    imgUrl: 'https://picsum.photos/200/300?random=44',
  }, {
    name: 'Trevor',
    imgUrl: 'https://picsum.photos/200/300?random=55',
  }],

  groupOptions: [{
    id: '1',
    name: 'A專案',
  }, {
    id: '2',
    name: 'B專案',
  }, {
    id: '3',
    name: 'C專案',
  }],

  missionsData: [{
    id: '0',
    title: 'To Do',
    list: [{
      id: uuid(),
      title: 'title1',
      description: 'description1',
      imgUrl: 'https://picsum.photos/200/120?random=1',
      color: '#ffa600',
      member: ['Vivi', 'Travis'],
      messageTotal: 0,
    }, {
      id: uuid(),
      title: 'title2',
      imgUrl: 'https://picsum.photos/200/120?random=2',
      color: '#ffa600',
      tasks: [{
        isCheck: true,
        taskName: 'test',
        id: uuid(),
      }, {
        isCheck: false,
        taskName: 'test',
        id: uuid(),
      }],
      messageTotal: 5,
      messages: [{
        name: 'Vivi',
        date: '2024-03-05 12:00:00',
        content: 'content1',
        id: uuid(),
      }, {
        name: 'Travis',
        content: 'content2',
        date: '2024-03-05 13:00:00',
        id: uuid(),
      }],
    }],
  }, {
    id: '1',
    title: 'In Progress',
    list: [{
      id: uuid(),
      title: 'title1',
      imgUrl: 'https://picsum.photos/200/120?random=3',
      color: '#ffa600',
      member: ['Travis'],
      messageTotal: 0,
    }, {
      id: uuid(),
      title: 'title1',
      color: '#ffa600',
      member: ['Vivi'],
      messageTotal: 5,
    }, {
      id: uuid(),
      title: 'title1',
      color: '#ffa600',
      member: ['Vivi'],
      messageTotal: 5,
    }],
  }, {
    id: '2',
    title: 'Finish',
    list: [],
  }, {
    id: '3',
    title: 'Pending',
    list: [],
  }],

  audienceOption: [{
    id: -1,
    label: 'All',
  }, {
    id: -2,
    label: 'Single Member',
  }, {
    id: -3,
    label: 'Customer Audience',
  }],

  mailCategoryList: [{
    id: 1,
    label: 'General',
  }, {
    id: 2,
    label: 'Image',
  }],

  category: 'Questionnaire',
  setCDNDomain: (data) => {
    set({ CDNDomain: data })
  },
  setLangList: (data) => {
    set({ langList: data })
  },

  setCustomSettingList: (data) => {
    set({ customSettingList: data })
  },
  setAudienceGroupList: (data) => {
    set({ audienceGroupList: data })
  },
}))

export default useOptionsState
