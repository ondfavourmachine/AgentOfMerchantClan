import { NuxtApp } from "@nuxt/types/app";
import axios from "@nuxtjs/axios";
import { ActionTree } from "vuex/types/index";

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
    phone?: string;
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

  NigerianBanks: Array<Bank>;
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
  NigerianBanks: []
});

export const mutations = {
  addBanksToStore(state: State, banks: Bank[]) {
    state.NigerianBanks = [...banks];
    //   this.$hello('store mutation')
    //   state.someValue = newValue
  },

  addStateToStore(state: State, states: NigerianState[]) {
    state.states = [...states];
    //   this.$hello('store mutation')
    //   state.someValue = newValue
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
  }
};
