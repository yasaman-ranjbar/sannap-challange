export interface AgentInfoProps {
  changeStep: () => void;
}

export interface OptionType {
  value: number;
  label: string;
}

export interface AgentInfoFormData {
  first_name: string;
  last_name: string;
  agent_code: string;
  province: OptionType | null;
  county: OptionType | null;
  insurance_branch: OptionType | null;
  phone: string;
  agency_type: "real" | "legal";
  agency_name?: string;
  Name?: string;
}
