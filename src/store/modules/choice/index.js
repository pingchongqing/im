import * as types from '../../type'
import { ChoiceApi } from '../../../api'
import * as _ from 'lodash'
export default {
    state: {
        postData: {},
        platFormList:[],
        gameAreaList:[],
        gameServerList:[],
        pubList: [],
        pageList: [],
        curList: [],
        pageStatus: 'loadopen',
        pyList: [],
        activeLetter: '',
        scrollPosition: 0,
        loadScrollPosition: 'hot',
        goodsList: [],
        isGoodsLoadAll: false,
        pcUrl: '',
        goodsScrollPosition: 0,
        sortActiveStatus: 1,
        goodsTypeList: [],
        goodsListPage: 1,
        filterPretyList: [],
        subFilterList: [],
        defaultFilterPretyList: [],
        errMsg: {},
        warnMsg: {}
    },
    mutations: {
      clearKeyword(state) {
        if(state.postData.keyWordList){
          state.postData.keyWordList.forEach((elem, index) => {
            if (elem.hasOwnProperty('title')) {
              state.postData.keyWordList.splice(index,1)
            }
          })
        }
      },

        [types.MUTPOSTDATA] (state, list) {
            state.postData = list
        },

        [types.MUTPLATFORMLIST] (state, list) {
            state.platFormList = list
        },

        [types.MUTGAMEAREAlIST] (state, list) {
            state.gameAreaList = list
        },

        [types.MUTGAMESERVERLIST] (state, list) {
            state.gameServerList = list
        },

        [types.GAMELIST] (state, list) {
            state.pubList = list
        },
        [types.QUICKLIST] (state, list) {
            state.quickList = list
        },

    [types.GAMELISTHOT] (state) {
      state.pageList = state.curList
      state.activeLetter = ''
      state.loadScrollPosition = 'hot'
    },

    [types.PYLIST] (state, list) {
      state.pyList = _.sortBy(_.union(state.pyList, list), function(n) {
        return n.charCodeAt()
      })
    },

    [types.ERRMSG] (state, msg) {
      let msgObj = {}
      if (typeof(msg) === 'string') {
        msgObj.message = msg
      } else if (msg instanceof Object) {
        msgObj = msg
      }
      state.errMsg = msgObj
    },

    [types.WARNMSG] (state, msg) {
      state.warnMsg = msg
    },

    [types.GAMELISTPY] (state, py) {
      let gameListPy = state.pubList.filter((elem) => {
        return elem.pyfirst.toLowerCase() === py.toLowerCase()
      })
      state.pageList = gameListPy
      state.activeLetter = py
      state.loadScrollPosition = py
    },

    [types.PAGESTATUS] (state, status) {
      state.pageStatus = status
    },

    [types.GAMEPAGE] (state, page) {
      for (let i=(page.pageIndex-1)*page.pageSize; i<page.pageIndex*page.pageSize; i++) {
        if (state.pubList[i]) {
          state.curList.push(state.pubList[i])
          state.pageList = state.curList
        } else {
          state.pageStatus = 'loadall'
        }
      }
    },

    [types.SCROLLPOSITION] (state, position) {
      state.scrollPosition = position
    },

    [types.GOODSLISTSCROLLPOSITION] (state, position) {
      state.goodsScrollPosition = position
    },

    [types.GOODSLIST] (state, list) {
      if (list) {
        if (list.length>0) {
          list.forEach(elem => {
            state.goodsList.push(elem)
          })
        } else {
          state.goodsList = []
        }
      } else {
        state.goodsList = []
      }
    },

    [types.PCURL] (state, url) {
      state.pcUrl = url
    },

    [types.GOODSLISTLOADALL] (state, loadStatus) {
      state.isGoodsLoadAll = loadStatus
    },

    [types.SORTACTIVESTATUS] (state, active) {
      state.sortActiveStatus = active
    },

    [types.GOODSTYPELIST] (state, list) {
      state.goodsTypeList = list
    },

    [types.SEARCHGAMELIST] (state, value) {
      if (value) {
        state.pageList = state.pubList.filter(function (item) {
            if (/^[a-zA-Z0-9/:;().]*$/.test(value)) {
                return item.pyfirst.toLowerCase().indexOf(value.toLowerCase()) !== -1;
            } else {
              return item.name.indexOf(value) !== -1
            }
        })
        state.pageStatus = 'loadclose'
        state.loadScrollPosition = 'search'
      } else {
        state.pageList = state.curList
        state.pageStatus = 'loadopen'
        state.loadScrollPosition = 'hot'
      }
    },

    [types.GOODSLISTPAGE] (state, pagenum) {
      state.goodsListPage = pagenum
    },

    [types.MUTFILTERPRETYLIST] (state, list) {
      state.filterPretyList = [...list]
    },

    [types.MUTDEFAULTFILTERPRETYLIST] (state) {
      state.filterPretyList.forEach(elem => {
        if (elem.subEOList) {
          if (elem.subEOList.length>0) {
            elem.subEOList.forEach(subElem => {
              subElem.checked = false
            })
          }
        }
      });
      state.filterPretyList = [...state.filterPretyList]
    },

    [types.MUTUPDATEFILTERPRETYLIST] (state, pre) {
      //fpl[pre[0]].subEOList[pre[1]].checked = true
      state.filterPretyList.forEach((elem, index) => {
        if (pre.filterControlType==1||pre.filterControlType==4||pre.filterControlType==5) {
          if (index == pre.index) {
            elem.subEOList.forEach((subElem, subIndex) => {
              if (subElem.propertyName == pre.propertyName) {
                if(pre.filterControlType==5) {
                  subElem.checked = true
                } else {
                  subElem.checked = !subElem.checked
                }
              } else {
                subElem.checked = false
              }
              if (!subElem.checked) {
                if (subElem.subCateList) {
                  subElem.subCateList.forEach(cateelem => {
                    cateelem.checked = false
                  });
                }
              }
            });
          }
        } else if (pre.filterControlType==2||pre.filterControlType==3) {
          if (index == pre.index) {
            elem.subEOList.forEach((subElem, subIndex) => {
              if (subElem.propertyName == pre.propertyName) {
                subElem.checked = !subElem.checked
                if (!subElem.checked) {
                  if (subElem.subCateList) {
                    subElem.subCateList.forEach(cateelem => {
                      cateelem.checked = false
                    });
                  }
                }
              }
              if (pre.propertyName == '安心买') {
                if (subElem.propertyName=='找回包赔') {
                  subElem.checked = false
                }
                if (subElem.propertyName=='无货赔付') {
                  if (pre.goodsType&&pre.goodsType==1) {

                  } else {
                    subElem.checked = false
                  }
                }
                if (subElem.propertyName=='商品可投保'||subElem.propertyName=='商品已投保') {
                  subElem.checked = false
                }
              }
              if (pre.propertyName == '找回包赔' || pre.propertyName == '无货赔付') {
                if (subElem.propertyName=='安心买') {
                  if (pre.goodsType&&pre.goodsType==1) {

                  } else {
                    subElem.checked = false
                  }
                }
              }
              if (pre.propertyName == '商品可投保' ) {
                if (subElem.propertyName=='安心买') {
                  subElem.checked = false
                }
                if (subElem.propertyName=='商品已投保') {
                  subElem.checked = false
                }
              }
              if (pre.propertyName == '商品已投保' ) {
                if (subElem.propertyName=='安心买') {
                  subElem.checked = false
                }
                if (subElem.propertyName=='商品可投保') {
                  subElem.checked = false
                }
              }
            });
          }
        }

      });
      state.filterPretyList = [...state.filterPretyList]
      //state.filterPretyList = fpl
    },

    [types.MUTMANYCHOILCE] (state, pre) {
      state.filterPretyList.forEach((elem, index) => {
          if (index == pre.index) {
            elem.manychoilce = pre.manychoilce
          }
      });
      state.filterPretyList = [...state.filterPretyList]
      state.subFilterList = state.filterPretyList[pre.index].subEOList
    },
    [types.MUTCHECKSUBCATE] (state, pre) {
      state.filterPretyList.forEach((elem, index) => {
          if (index == pre.index) {
            elem.subEOList.forEach((subelem, subindex) => {
              if (subindex == pre.subindex) {
                subelem.subCateList.forEach(cateelem => {
                  if (cateelem.propertyName == pre.subCate.propertyName) {
                    cateelem.checked = !cateelem.checked
                  }
                })
              }
            })
          }
      })
      state.filterPretyList = [...state.filterPretyList]

    },

    [types.SUBCHOILCELIST] (state,list) {
      state.subFilterList = list
    }

  },
  actions: {
    [types.CHEKSUBCATESTORE]({commit}, pre) {
      commit(types.MUTCHECKSUBCATE, pre)
    },
    [types.ACTSUBCHOILCELIST] ({commit}, list) {
      commit(types.SUBCHOILCELIST, list)
    },
    [types.MANYCHOILCE] ({commit}, pre) {
      commit(types.MUTMANYCHOILCE, pre)
    },
    [types.CLEARFILTERPRETY] ({commit}) {
      commit(types.MUTDEFAULTFILTERPRETYLIST)
    },
    [types.UPDATEFILTERPRETYLIST] ({commit}, pre) {
      commit(types.MUTUPDATEFILTERPRETYLIST, pre)
    },

    //端游筛选属性
    [types.GETFILTERPRETYLIST]({commit}, params) {
      return new Promise((resolve, reject) => {
          ChoiceApi.queryFilterProperty(params).then(
              res => {
                  if (res.body.gamePropertyRelationAllEOList && res.body.gamePropertyRelationAllEOList.length > 0) {
                    let ez = res.body.gamePropertyRelationAllEOList
                    ez.forEach(elem => {
                      if (elem.subEOList&&elem.subEOList.length>0) {
                        elem.subEOList.forEach(subelem => {
                          if (subelem.subCategory) {
                            subelem.subCateList = []
                            let arr = subelem.subCategory.split(',')
                            arr.forEach(arrelem => {
                              subelem.subCateList.push({
                                propertyName: arrelem.split(':\'')[0],
                                filterValue: arrelem.split(':\'')[1].slice(0,-2)
                              })
                            });
                          }
                        });
                      }
                    });
                      commit(types.MUTFILTERPRETYLIST, ez)
                      resolve()
                  } else {
                      commit(types.MUTFILTERPRETYLIST, [])
                      resolve()
                  }
              },
              err => {
                  reject()
              }
          )
      })
    },
    //端游区
    [types.ACTPCGAMEAREALIST] ({commit}, params) {
      return new Promise((resolve, reject) => {
          ChoiceApi.searchbyparentid(params).then(
              res => {
                  if (res.body.categoryList && res.body.categoryList.length > 0) {
                      commit(types.MUTGAMEAREAlIST, res.body.categoryList)
                      resolve()
                  } else {
                      commit(types.MUTGAMEAREAlIST, [])
                      resolve()
                  }
              },
              err => {
                  reject()
              }
          )
      })
    },

    //端游服
    [types.ACTPCGAMESERVERLIST] ({commit}, params) {
      return new Promise((resolve, reject) => {
          ChoiceApi.searchserverbyparentid(params).then(
              res => {
                  if (res.body.categoryList && res.body.categoryList.length > 0) {
                      commit(types.MUTGAMESERVERLIST, res.body.categoryList)
                      resolve()
                  } else {
                      commit(types.MUTGAMESERVERLIST, [])
                      resolve()
                  }
              },
              err => {
                  reject()
              }
          )
      })
    },

        //获取postData
        [types.ACTPOSTDATA] ({commit}, obj) {
            commit(types.MUTPOSTDATA, obj)
        },
        //清除postData
        [types.CLEARPOSTDATA] ({commit}) {
            commit(types.MUTPOSTDATA, {})
        },

        //获取 平台
        [types.ACTPLATFORMLIST] ({commit}, params) {
            return new Promise((resolve, reject) => {
                ChoiceApi.getplatforminfobygameid(params).then(
                    res => {
                        if (res.body.data && res.body.data.length > 0) {
                            commit(types.MUTPLATFORMLIST, res.body.data)
                            resolve()
                        } else {
                            commit(types.MUTPLATFORMLIST, [])
                            resolve()
                        }
                    },
                    err => {
                        reject()
                    }
                )
            })
        },
        //清除 平台
        [types.CLEARPLATFORMLIST] ({commit}) {
            commit(types.MUTPLATFORMLIST, [])
        },

        //获取 客户端
        [types.ACTGAMEAREAlIST] ({commit}, params) {
            return new Promise((resolve, reject) => {
                ChoiceApi.getgameareasbygameandplatform(params).then(
                    res => {
                        if (res.body.data && res.body.data.length > 0) {
                            commit(types.MUTGAMEAREAlIST, res.body.data)
                            resolve()
                        } else {
                            commit(types.MUTGAMEAREAlIST, [])
                            resolve()
                        }
                    },
                    err => {
                        reject()
                    }
                )
            })
        },
        //清除 客户端
        [types.CLEARGAMEAREAlIST] ({commit}) {
            commit(types.MUTGAMEAREAlIST,[])
        },

        //获取 区服
        [types.ACTGAMESERVERLIST] ({commit}, params) {
            return new Promise((resolve, reject) => {
                ChoiceApi.getgameServer(params).then(
                    res => {
                        if (res.body.data && res.body.data.length > 0) {
                            commit(types.MUTGAMESERVERLIST, res.body.data)
                            resolve()
                        } else {
                            commit(types.MUTGAMESERVERLIST, [])
                            resolve()
                        }
                    },
                    err => {
                        reject()
                    }
                )
            })
        },
        //清除 区服
        [types.CLEARGAMESERVERLIST] ({commit}) {
            commit(types.MUTGAMESERVERLIST, [])
        },

    //获取游戏列表
    [types.SEARCH_GAMELIST] ({commit}, params) {
      return new Promise((resolve, reject) => {
        ChoiceApi.searchGameListByType(params).then(
          res => {
            if (res.body && res.body.success && res.body.categoryList) {
              if ( res.body.categoryList.length > 0) {
                commit(types.GAMELIST, res.body.categoryList)
                commit(types.ERRMSG, null)
              } else {
                // commit(types.ERRMSG, {message: '没有相关游戏数据', returnUrl: '/'})
              }
              resolve()
            } else {
              commit(types.ERRMSG, '获取游戏列表失败')
              reject()
            }
          },
          err => {
            console.log(err)
            commit(types.ERRMSG, '连接游戏列表服务失败')
            reject()
          }
        )
      })

    },

    //清除错误提示
    [types.CLEAR_ERR] ({commit}) {
      commit(types.ERRMSG, null)
    },

    //清除警告提示
    [types.CLEAR_WARN] ({commit}) {
      commit(types.WARNMSG, null)
    },

    //获取游戏拼音列表
    [types.GET_GAMEPY] ({commit}, params) {
      ChoiceApi.getGamePy(params).then(
        res => {
          if (res.body.success && res.body.py) {
            if ( res.body.py.length > 0) {
              commit(types.PYLIST, res.body.py)
              commit(types.ERRMSG, null)
            } else {
              commit(types.PYLIST, ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'])
            }
          } else {
            console.log('获取拼音数据失败');
          }
        },
        err => {
          console.log(err)
        }
      )
    },

    //根据首字母获取游戏列表
    [types.GET_GAMELIST_PY] ({commit}, letter) {
      commit(types.GAMELISTPY, letter)
    },

    [types.GET_GAMELISTHOT] ({commit}) {
      commit(types.GAMELISTHOT)
    },

    [types.SET_PAGESTATUS] ({commit}, status) {
      commit(types.PAGESTATUS, status)
    },

    [types.SHOWGAMEPAGE] ({commit}, page) {
      commit(types.GAMEPAGE, page)
    },

    [types.SAVE_SCROLLPOSITION] ({commit}, position) {
      commit(types.SCROLLPOSITION, position)
    },

    //搜索列表
    [types.GET_LISTDATA] ({commit}, params) {
      return new Promise((resolve, reject) => {
        commit(types.GOODSLISTLOADALL, true)
        ChoiceApi.goodsSearchList(params).then(
          res => {
            if (res.body.success && res.body.result) {
              let goodsResult = JSON.parse(res.body.result)
              if (goodsResult.viewtotal === 0) {
                commit(types.GOODSLIST, [])
              } else if ( goodsResult.items.length > 0) {
                if (goodsResult.items.length < params.pageCount) {
                  commit(types.GOODSLIST, goodsResult.items)
                  commit(types.GOODSLISTLOADALL, true)
                  console.log('商品列表加载完成');
                } else {
                  commit(types.GOODSLIST, goodsResult.items)
                  commit(types.GOODSLISTLOADALL, false)
                }
              } else {
                commit(types.GOODSLISTLOADALL, true)
                console.log('商品列表加载完成');
              }
              resolve()
            }
            else {
              if (res.body.responseStatus.message.indexOf('6009')>-1) {
                commit(types.ERRMSG, '亲，选择的筛选条件不得超过10项，请减少些筛选条件哦')
                commit(types.GOODSLIST, [])
                commit(types.GOODSLISTLOADALL, true)
              } else {
                commit(types.ERRMSG, res.body.responseStatus.message)
              }
              resolve()
            }
          },
          err => {
            console.log(err)
            reject('连接商品列表服务失败')
          }
        )
      })
    },

    [types.GET_PCURL] ({commit}, params) {
      ChoiceApi.convertgoodsurl(params).then(
        res => {
          if (res.body.success && res.body.url) {
            commit(types.PCURL, res.body.url)
          } else {
            //commit(types.WARNMSG, {message: res.body.responseStatus.message})
            console.log(res)
          }
        },
        err => {
          console.log(err)
        }
      )
    },

    [types.CLEAR_GOODSLIST] ({commit}) {
      commit(types.GOODSLIST, [])
    },

    [types.SAVEGOODSLISTSCROLLPOSITION] ({commit}, position) {
      commit(types.GOODSLISTSCROLLPOSITION, position)
    },

    [types.SORTACTIVE] ({commit}, active) {
      commit(types.SORTACTIVESTATUS, active)
    },

    [types.GET_GOODSTYPELIST] ({commit}, params) {
      return new Promise((resolve, reject) => {
        ChoiceApi.searchGoodsTypeByGameid(params).then(
          res => {
            if (res.body.goodsTypeList && res.body.goodsTypeList.length > 0) {
              commit(types.GOODSTYPELIST, res.body.goodsTypeList)
              resolve()
            } else {
              resolve()
            }
          },
          err => {
            reject()
          }
        )
      })
    },

    [types.SEARCHGAME] ({commit}, value) {
      commit(types.SEARCHGAMELIST, value)
    },

    [types.CLEAR_TYPELIST] ({commit}) {
      commit(types.GOODSTYPELIST, null)
    },

    [types.SETGOODSLISTPAGE] ({commit}, pagenum) {
      commit(types.GOODSLISTPAGE, pagenum)
    },
    [types.GET_QUICKLIST] ({commit}, params) {
        var QuickTemp={
	        'YX16060614453952100011':{
		        0:{
                    img:"/dist/lol2.jpg",
			        "100001":'招募令'
		        },
		        1:{
                    img:"/dist/lol1.jpg",
                    "100-max":'100以上'
		        }
	        },
	        'YX16063012173644300001':{
		        0:{
			        img:"/dist/wow.jpg",
			        "1":'套餐1',
			        "2":'套餐2'
		        },
	        },
	        'YX16063014064728700455':{
		        0:{
			        img:"/dist/sword3_2.jpg",
			        "10":'联系客服',
			        "20":'专属定制',
			        "30":'极速分离',
			        "31":'捏脸数据',
			        "40":'捏脸数据',
		        },
		        1:{
			        img:"/dist/sword3_1.jpg",
			        "1-1":'成男',
			        "2-2":'成女',
			        "3-3":'萝莉',
			        "4-4":'正太',
		        },
	        }

        }
	    var promise = new Promise((resolve, reject) => {
		    ChoiceApi.getQuickList(params).then(
			    res => {
				    if (res.body.success&&res.body.data) {
				        var quick = res.body.data
					    var gameId = params.gameId;
              if (!quick.Configs) {
                quick.Configs = []
              }
					    quick.Configs.forEach(function (config) {
						    config.list = []
						    config.Options.forEach(function (option) {
							    var name = option
							    if(QuickTemp[gameId]&&QuickTemp[gameId][config.AccountType]&&QuickTemp[gameId][config.AccountType][option]){
								    name = QuickTemp[gameId][config.AccountType][option]
							    }
							    config.list.push({name:option,name2:name})
						    })
					    })
              if (!quick.List) {
                quick.List = []
              }
					    quick.List.forEach(function (list) {
						    quick.Configs.forEach(function (config) {
							    if(list.AccountType==config.AccountType){
								    config.GameName = list.GameName
								    config.server_name = list.GameServer
								    config.region_name = list.GameArea
                                    if(QuickTemp[gameId]&& QuickTemp[gameId][config.AccountType]){
	                                    config.goods_img = QuickTemp[gameId][config.AccountType].img||quick.gameImageUrl
                                    }else {
	                                    config.goods_img = quick.gameImageUrl
                                    }
								    var lastNum = 0
								    config.list.forEach(function (data) {
									    var temp = data.name.split('-')
									    if(temp.length==2&&Number(temp[0])<=list.Number&&(Number(temp[1])>=list.Number||temp[1]=='max')){
										    data.value = list.Price
										    data.title = list.Title
										    data.id = list.ID
									    }else if(lastNum<list.Number&&Number(data.name)>=list.Number){
										    data.value = list.Price
										    data.title = list.Title
										    data.id = list.ID
									    }
									    lastNum = Number(data.name)
								    })
							    }
						    })
					    })
					    quick.Configs.forEach(function (config) {
						    config.select =  config.list[0]
					    })
					    commit(types.QUICKLIST, quick)
					    resolve(JSON.parse(JSON.stringify(quick)))
				    } else {
					    resolve()
				    }
			    },
			    err => {
				    reject()
			    }
		    )
	    })
        return promise;
    }

  },
  getters: {
    [types.SORTSTATUSNAME] (state) {
      switch (state.sortActiveStatus) {
        case 1:
          return '默认排序'
          break;
        case 2:
          return '热门排序'
          break;
        case 3:
          return '价格从低到高'
          break;
        case 4:
          return '价格从高到低'
          break;
        default:
          return '默认排序'
      }
    },
    [types.SCREENPRETY] (state) {
      var arr = []

      state.filterPretyList.forEach(elem => {
        var ptr = {
          accurateMap:[],
          keyWordList:[],
          betweenMap:[]
        }
        if (elem.filterControlType!=5) {
          switch (elem.filterType) {
            case 3:
              if(elem.subEOList) {
                if (elem.subEOList.length>0) {
                  elem.subEOList.forEach(subelem => {
                    if (subelem.checked) {
                      ptr.betweenMap.push({
                        filterAlyField:subelem.filterAlyField,
                        filterValue:subelem.filterValue
                      })
                    }
                  });
                }
              }
              break;
            case 2:
              if(elem.subEOList) {
                if (elem.subEOList.length>0) {
                  elem.subEOList.forEach(subelem => {
                    if (subelem.checked) {
                      ptr.keyWordList.push({
                        filterAlyField:subelem.filterAlyField,
                        filterValue:subelem.filterValue
                      })
                      if(subelem.subCateList) {
                        subelem.subCateList.forEach(cateelem => {
                          if (cateelem.checked) {
                            ptr.keyWordList.push({
                              filterAlyField:'filter_subcate',
                              filterValue:cateelem.filterValue
                            })
                          }
                        });
                      }
                    }
                  });
                }
              }
              break;
              case 1:
                if(elem.subEOList) {
                  if (elem.subEOList.length>0) {
                    elem.subEOList.forEach(subelem => {
                      if (subelem.checked) {
                        ptr.accurateMap.push({
                          filterAlyField:subelem.filterAlyField,
                          filterValue:subelem.filterValue
                        })
                      }
                    });
                  }
                }
                break;
            default:

          }
        }
        arr.push(ptr)
      });
      return arr
    },
    [types.FILTERNUMBERDATA] (state) {
      var ptr = {
        accurateMap:[],
        keyWordList:[],
        betweenMap:[]
      }
      state.filterPretyList.forEach((elem, index) => {
        if (elem.filterControlType==4) {
          switch (elem.filterType) {
            case 3:
              ptr.betweenMap.push({
                filterAlyField:elem.filterAlyField,
                propertyName:elem.propertyName,
                filterValue:index
              })
              break;
            case 2:
              ptr.keyWordList.push({
                filterAlyField:elem.filterAlyField,
                propertyName:elem.propertyName,
                filterValue:index
              })
              break;
            case 1:
              ptr.accurateMap.push({
                filterAlyField:elem.filterAlyField,
                propertyName:elem.propertyName,
                filterValue:index
              })
              break;
            default:

          }
        }
      });
      return ptr
    },
    [types.FILTERBETWEENDATA] (state) {
      var ptr = {
        accurateMap:[],
        keyWordList:[],
        betweenMap:[]
      }
      state.filterPretyList.forEach((elem, index) => {
        if (elem.filterControlType==5) {
          switch (elem.filterType) {
            case 3:
              ptr.betweenMap.push({
                filterAlyField:elem.filterAlyField,
                propertyName:elem.propertyName,
                filterValue:index
              })
              break;
            case 2:
              ptr.keyWordList.push({
                filterAlyField:elem.filterAlyField,
                propertyName:elem.propertyName,
                filterValue:index
              })
              break;
            case 1:
              ptr.accurateMap.push({
                filterAlyField:elem.filterAlyField,
                propertyName:elem.propertyName,
                filterValue:index
              })
              break;
            default:

          }
        }
      });
      return ptr
    },
    [types.FILTERTEXTDATA] (state) {
      var ptr = {
        accurateMap:[],
        keyWordList:[],
        betweenMap:[]
      }
      state.filterPretyList.forEach((elem, index) => {
        if (elem.filterControlType==3) {
          switch (elem.filterType) {
            case 3:
              ptr.betweenMap.push({
                filterAlyField:elem.filterAlyField,
                propertyName:elem.propertyName,
                filterValue:index
              })
              break;
            case 2:
              ptr.keyWordList.push({
                filterAlyField:elem.filterAlyField,
                propertyName:elem.propertyName,
                filterValue:index
              })
              break;
            case 1:
              ptr.accurateMap.push({
                filterAlyField:elem.filterAlyField,
                propertyName:elem.propertyName,
                filterValue:index
              })
              break;
            default:

          }
        }
      });
      return ptr
    },
    [types.SUBCATELIST](state) {
      let arr = []
      state.filterPretyList.forEach((elem, index) => {
        if (elem.subEOList&&elem.subEOList.length>0) {
          elem.subEOList.forEach((subelem, subindex) => {
            if (subelem.checked) {
              if (subelem.subCateList&&subelem.subCateList.length>0) {
                arr.push({index:index,subindex:subindex, name:subelem.propertyName, sublist:subelem.subCateList})
              }
            }
          });
        }
      })
      return arr
    },
  }
}
