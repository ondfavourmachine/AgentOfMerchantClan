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
  assigned_tasks: Array<{
    phone: string;
    full_name: string;
    email: null | string;
    gender: null | string;
    date_of_birth: null | string;
    address: null | string;
    picture: null | string;
  }>;
  assigned_tasks_number: number;
  justRegistered: boolean;
  getDashboardStatus: "notfetched" | "fetched" | "failed";
  unopened_notifications_ids: any[];
  dashboardData: {
    customer_count?: number;
    merchant_transactions?: number;
    onboarded_merchants_count?: number;
    total_sales_amount?: number;
  };
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
    date_signed: "",
    passport: ""
  },
  unopened_notifications_ids: [],
  states: [],
  NigerianBanks: [],
  currentState: "personal",
  assigned_tasks: [],
  assigned_tasks_number: 0,
  agentsInterest: new Set(),
  apiCall: false,
  token: "",
  justRegistered: true,
  getDashboardStatus: "notfetched",
  dashboardData: {},
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
    state.justRegistered = true;
    state.dashboardData = {};
    state.getDashboardStatus = "notfetched";
    let key: string;
    for (key in state.user) {
      state.user[key] = "";
    }
  },

  SET_ASSIGNED_TASKS(state: State, tasks) {
    state.assigned_tasks = { ...state.assigned_tasks, ...tasks };
    state.assigned_tasks_number = state.assigned_tasks.length;
    state.unopened_notifications_ids = tasks["unopened_notifications_ids"];
  },

  JUST_REGISTERED_TO_DEFAULT(state: State) {
    state.justRegistered = true;
  },

  SET_GETDASHBOARD_STATUS(state: State, status) {
    state.getDashboardStatus = status;
  },
  SET_DASHBOARD_DATA(state: State, data) {
    state.dashboardData = data;
  },

  MODIFY_JUST_REGISTERED(state: State) {
    state.justRegistered = true;
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
      // console.log(error);
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
      // console.log(error);
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
  },

  setJustRegistered({ commit }) {
    commit("MODIFY_JUST_REGISTERED");
  },

  setJustRegisteredBackToDefaultValue({ commit }) {
    commit("JUST_REGISTERED_TO_DEFAULT");
  },

  async fetchAllAgentsMerchants({ commit, state }) {
    try {
      let response: Response | any = await fetch(
        `${state.url}agent/dashboard/7`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${state.token}`
          }
        }
      );

      response = await response.json();
      // console.log(response);
      commit("SET_GETDASHBOARD_STATUS", "fetched");
      commit("SET_DASHBOARD_DATA", response.data);
    } catch (error) {
      commit("SET_GETDASHBOARD_STATUS", "failed");
    }
  },

  async getAssignedTasks({ commit, state }) {
    try {
      let response: Response | any = await fetch(`${state.url}avs/requests`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      });

      response = await response.json();
      // console.log(response);
      commit("SET_ASSIGNED_TASKS", response);
    } catch (error) {
      // commit("SET_GETDASHBOARD_STATUS", "failed");
      console.log(error);
    }
  }
};
