export const state = () => ({
    dialog: {
        isShow: false,
        title: '',
        message: '',
    },
    register: {
        firstname: '',
        lastname: '',
        gender: 1,
        birthday: null,
        email: '',
        phone: '',
        house_no: '',
        village_no: '',
        village: '',
        province: '',
        district: '',
        subdistrict: '',
    },
    line: {
        pictureUrl: '',
        displayName: '',
        userId: ''
    }
})

export const getters = {
    getRegister(state) {
        return state.register
    },
    getDialog(state) {
        return state.dialog
    },
    getLine(state) {
        return state.line
    }
}

export const mutations = {
    SET_REGISTER(state, data) {
        state.register = {
            ...state.register,
            ...data
        }
    },
    SET_DIALOG(state, data) {
        state.dialog = {
            ...state.dialog,
            ...data
        }
    },
    SET_LINE(state, data) {
        state.line = {
            ...state.line,
            ...data
        }
    }
}

export const actions = {
    setRegister({ commit }, data) {
        commit('SET_REGISTER', data)
    },
    setDialog({ commit }, data) {
        commit('SET_DIALOG', data)
    },
    setLine({ commit }, data) {
        commit('SET_LINE', data)
    }
}