import { ActionTree, MutationTree } from "vuex/types/index";

// import axios from '@nuxtjs/axios';

interface State {
  user: {
    [x: string]: string | any;
    // first_name?: string | any;
    // last_name?:  string | any;
    // gender?:  string | any;
    // title?:  string | any;
    // agent_no?:  string | any;
    // date_of_birth?:  string | any;
    // start_date?:  string | any;
    // bank_name?:  string | any;
    // account_name?:  string | any;
    // account_number?:  string | any;
    // bank_branch?:  string | any;
    // address?:  string | any;
    // state?:  string | any;
    // suburb?:  string | any;
    // home_phone?:  string | any;
    // postcode?:  string | any;
    // email?:  string | any;
    // mobile?:  string | any;
    // full_name:  string | any;
    // nok_name?:  string | any;
    // nok_relationship?:  string | any;
    // nok_address?:  string | any;
    // nok_suburb?:  string | any;
    // nok_state?:  string | any;

    // nok_postcode?:  string | any;
    // nok_home_phone?:  string | any;
    // nok_mobile?:  string | any;
    // nok_work?:  string | any;
    // employee_signature?:  string | any;
    // date_signed?:  string | any;
  };

  states: Array<NigerianState>;
  currentState: "personal" | "bank-details" | "address" | "next-of-kin";
  NigerianBanks: Array<Bank>;
  agentsInterest: Set<string>;
  apiCall: boolean;
  token: string | undefined;
  url: string;
}

interface Bank {
  bank_id: string;
  bank_name: string;
}

interface NigerianState {
  id: string;
  value: string;
}

export type RootState = ReturnType<typeof state>;

export const state = (): State => ({
  user: {
    first_name: "",
    last_name: "",
    gender: "",
    title: "",
    agent_no: "",
    date_of_birth: "",
    start_date: "",
    bank_name: "",
    account_name: "",
    account_number: "",
    bank_branch: "",
    address: "",
    state: "",
    suburb: "",
    home_phone: "",
    postcode: "",
    email: "",
    mobile: "",
    full_name: "",
    nok_name: "",
    nok_relationship: "",
    nok_address: "",
    nok_suburb: "",
    nok_state: "",
    nok_postcode: "",
    nok_home_phone: "",
    nok_mobile: "",
    nok_work: "",
    employee_signature: "",
    date_signed: ""
  },
  states: [],
  NigerianBanks: [],
  currentState: "personal",
  agentsInterest: new Set(),
  apiCall: false,
  token: "",
  url:
    "https://covidreliefbackend.covidrelief.com.ng/merchantclan/public/index.php/api/"
});

export const mutations: MutationTree<RootState> = {
  RESET_STORE(state: State) {
    state.apiCall = false;
    state.NigerianBanks = [];
    state.states = [];
    state.agentsInterest = new Set();
    state.token = "";
    state.url =
      "https://covidreliefbackend.covidrelief.com.ng/merchantclan/public/index.php/api/";

    let key: string;
    for (key in state.user) {
      state.user[key] = "";
    }
  },

  addBanksToStore(state: State, banks: Bank[]) {
    state.NigerianBanks = [...banks];
    //   this.$hello('store mutation')
    //   state.someValue = newValue
  },

  addStateToStore(state: State, states: NigerianState[]) {
    state.states = [...states];
    //   this.$hello('store mutation')
    //   state.someValue = newValue
  },

  apiCallState(state: State, value: boolean) {
    state.apiCall = value;
  },

  addToInterests(state: State, interest: string): void {
    state.agentsInterest.add(interest);
  },

  changeCurrentState(
    state: State,
    newValue: "personal" | "bank-details" | "address" | "next-of-kin"
  ) {
    state.currentState = newValue;
  },

  modifyAddressPartOfState(state: State, newValue: Partial<State>) {
    state.user = { ...state.user, ...newValue };
  },

  modifyPersonalDetailsOfAgentInOfState(
    state: State,
    newValue: Partial<State>
  ) {
    state.user = { ...state.user, ...newValue };
  },

  modifyBankDetailsOfAgentInOfState(state: State, newValue: Partial<State>) {
    state.user = { ...state.user, ...newValue };
  },

  INSERT_LOGGED_IN_USER(state: State, user: any) {
    state.user = { ...state.user, ...user };
  },

  INSERT_TOKEN(state: State, token: string) {
    state.token = token;
  },

  modifyNextOfKinDetailsOfAgentInOfState(
    state: State,
    newValue: Partial<State>
  ) {
    state.user = { ...state.user, ...newValue };
  }
};

export const actions: ActionTree<RootState, RootState> = {
  async fetchAllBanks({ commit, state }) {
    try {
      let url = "https://mobile.creditclan.com/webapi/v1/banks";
      // "x-api-key": "z2BhpgFNUA99G8hZiFNv77mHDYcTlecgjybqDACv"
      let response: any = await fetch(url, {
        method: "GET",
        headers: {
          "x-api-key": "z2BhpgFNUA99G8hZiFNv77mHDYcTlecgjybqDACv"
        }
      });

      response = await response.json();

      // const response = await this.$axios.$get<{
      //   data: Bank[];
      //   status: boolean;
      // }>("banks");

      commit("addBanksToStore", response.data);
    } catch (error) {
      console.log(error);
    }
  },

  async fetchAllStates({ commit, state }) {
    try {
      const response = await this.$axios.$get<{
        data: NigerianState[];
        status: boolean;
      }>("states");

      const { data } = response;
      commit("addStateToStore", data);
    } catch (error) {
      console.log(error);
    }
  },

  setNextStage({ commit }, newValue) {
    commit("changeCurrentState", newValue);
  },

  setPersonalDetails({ commit }, newValue) {
    commit("modifyPersonalDetailsOfAgentInOfState", newValue);
  },

  setBankDetails({ commit }, newValue: Partial<State>) {
    commit("modifyBankDetailsOfAgentInOfState", newValue);
  },

  setAddress({ commit }, newValue: Partial<State>) {
    commit("modifyAddressPartOfState", newValue);
  },

  setNextOfKinDetails({ commit }, newValue: Partial<State>) {
    commit("modifyNextOfKinDetailsOfAgentInOfState", newValue);
  },

  setAgentInterests({ commit }, valueToAdd: string) {
    commit("addToInterests", valueToAdd);
  },

  setApiCallState({ commit }, valueToAdd: boolean) {
    commit("apiCallState", valueToAdd);
  },

  setLoggedInUser({ commit }, user: Record<string, string>) {
    commit("INSERT_LOGGED_IN_USER", user);
  },

  setToken({ commit }, token: string) {
    commit("INSERT_TOKEN", token);
  },

  resetStore({ commit }) {
    commit("RESET_STORE");
  }
};
