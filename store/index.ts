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
}

export const state = (): State => ({
  agentDetails: {}
});

export const mutations = {
  fetchValues(state: State, newValue: any) {
    //   this.$hello('store mutation')
    //   state.someValue = newValue
  }
};

export const actions = {
  setSomeValueToWhatever(context: Vue) {
    //   this.$hello('store action')
    //   const newValue = 'whatever'
    //   context.$store.commit('changeSomeValue', newValue)
  }
};
