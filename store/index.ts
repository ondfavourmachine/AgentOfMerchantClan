import { ActionTree, MutationTree } from "vuex/types/index";

// import axios from '@nuxtjs/axios';

interface State {
  agentDetails: {
    first_name?: string;
    last_name?: string;
    gender?: string;
    title?: string;
    date_of_birth?: string;
    start_date?: string;
    bank_name?: null | string;
    account_name?: string;
    account_number?: string;
    bank_branch?: string;
    address?: "";
    state?: null | string;
    suburb?: string;
    home_phone?: string;
    postcode?: string;
    email?: string;
    mobile?: string;

    nok_name?: "";
    nok_relationship?: "";
    nok_address?: "";
    nok_suburb?: "";
    nok_state?: null;

    nok_postcode?: "";
    nok_home_phone?: "";
    nok_mobile?: "";
    nok_work?: "";
    employee_signature?: "";
    date_signed?: "";
  };

  states: Array<NigerianState>;
  currentState: "personal" | "bank-details" | "address" | "next-of-kin";
  NigerianBanks: Array<Bank>;
  agentsInterest: Set<string>;
  apiCall: boolean;
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
  agentDetails: {},
  states: [],
  NigerianBanks: [],
  currentState: "personal",
  agentsInterest: new Set(),
  apiCall: false
});

export const mutations: MutationTree<RootState> = {
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
    state.agentDetails = { ...state.agentDetails, ...newValue };
  },

  modifyPersonalDetailsOfAgentInOfState(
    state: State,
    newValue: Partial<State>
  ) {
    state.agentDetails = { ...state.agentDetails, ...newValue };
  },

  modifyBankDetailsOfAgentInOfState(state: State, newValue: Partial<State>) {
    state.agentDetails = { ...state.agentDetails, ...newValue };
  },
  modifyNextOfKinDetailsOfAgentInOfState(
    state: State,
    newValue: Partial<State>
  ) {
    state.agentDetails = { ...state.agentDetails, ...newValue };
  }
};

export const actions: ActionTree<RootState, RootState> = {
  async fetchAllBanks({ commit, state }) {
    try {
      const response = await this.$axios.$get<{
        data: Bank[];
        status: boolean;
      }>("banks");

      const { data } = response;
      commit("addBanksToStore", data);
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
    console.log(this.state.agentDetails);
    commit("modifyPersonalDetailsOfAgentInOfState", newValue);
    console.log(this.state.agentDetails);
  },

  setBankDetails({ commit }, newValue: Partial<State>) {
    commit("modifyBankDetailsOfAgentInOfState", newValue);
  },

  setAddress({ commit }, newValue: Partial<State>) {
    console.log(this.state.agentDetails);
    commit("modifyAddressPartOfState", newValue);
    console.log(this.state.agentDetails);
  },

  setNextOfKinDetails({ commit }, newValue: Partial<State>) {
    commit("modifyNextOfKinDetailsOfAgentInOfState", newValue);
  },

  setAgentInterests({ commit }, valueToAdd: string) {
    commit("addToInterests", valueToAdd);
  },

  setApiCallState({ commit }, valueToAdd: boolean) {
    commit("apiCallState", valueToAdd);
  }
};
