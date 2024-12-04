import {
    ChainInfo,
    CheckTermsOfServiceResponseDto, ClaimRewardsRequestDto, ClaimRewardsResponse,
    DelegationSummaryDto,
    DelegationSummaryDtoByVault, SplitRequestDto, SplitResponse,
    StakeRequestDto, StakeResponse,
    StakingChain,
    StakingPosition, StakingProvider,
    UnstakeRequestDto, UnstakeResponse, WithdrawRequestDto, WithdrawResponse,
} from "./types";
import { StakingSDK } from "./staking-sdk";
import { ApiClient } from "../api-client";

const STAKING_BASE_PATH = "/v1/staking";

export class StakingApiClient implements StakingSDK {
    constructor(private readonly apiClient: ApiClient) {}
    public async getChains(): Promise<string[]> {
        return await this.apiClient.issueGetRequest(`${STAKING_BASE_PATH}/chains`);
    }
    public async getChainInfo(chainDescriptor: StakingChain): Promise<ChainInfo> {
        return await this.apiClient.issueGetRequest(`${STAKING_BASE_PATH}/chains/${chainDescriptor}/chainInfo`);
    }
    public async getPositionsSummary(): Promise<DelegationSummaryDto> {
        return await this.apiClient.issueGetRequest(`${STAKING_BASE_PATH}/positions/summary`);
    }
    public async getPositionsSummaryByVault(): Promise<DelegationSummaryDtoByVault> {
        return await this.apiClient.issueGetRequest(`${STAKING_BASE_PATH}/positions/summary/vaults`);
    }
    public async stake(
        chainDescriptor: StakingChain,
        body: StakeRequestDto,
    ): Promise<StakeResponse> {
        return await this.apiClient.issuePostRequest(
            `${STAKING_BASE_PATH}/chains/${chainDescriptor}/stake`,
            body,
        );
    }
    public async unstake(
        chainDescriptor: StakingChain,
        body: UnstakeRequestDto,
    ): Promise<UnstakeResponse> {
        return await this.apiClient.issuePostRequest(
            `${STAKING_BASE_PATH}/chains/${chainDescriptor}/unstake`,
            body,
        );
    }
    public async withdraw(
        chainDescriptor: StakingChain,
        body: WithdrawRequestDto,
    ): Promise<WithdrawResponse> {
        return await this.apiClient.issuePostRequest(
            `${STAKING_BASE_PATH}/chains/${chainDescriptor}/withdraw`,
            body,
        );
    }
    public async claimRewards(
        chainDescriptor: StakingChain,
        body: ClaimRewardsRequestDto,
    ): Promise<ClaimRewardsResponse> {
        return await this.apiClient.issuePostRequest(
            `${STAKING_BASE_PATH}/chains/${chainDescriptor}/claimRewards`,
            body,
        );
    }
    public async split(chainDescriptor: StakingChain, body: SplitRequestDto): Promise<SplitResponse> {
        return await this.apiClient.issuePostRequest(
            `${STAKING_BASE_PATH}/chains/${chainDescriptor}/split`,
            body,
        );
    }
    public async getPositions(chainDescriptor?: StakingChain): Promise<StakingPosition[]> {
        const url = `${STAKING_BASE_PATH}/positions${chainDescriptor ? `?chainDescriptor=${chainDescriptor}` : ""}`;
        return await this.apiClient.issueGetRequest(url);
    }
    public async getPosition(positionId: string): Promise<StakingPosition> {
        return await this.apiClient.issueGetRequest(`${STAKING_BASE_PATH}/positions/${positionId}`);
    }
    public async getProviders(): Promise<StakingProvider[]> {
        return await this.apiClient.issueGetRequest(`${STAKING_BASE_PATH}/providers`);
    }
    public async approveProviderTermsOfService(providerId: string): Promise<CheckTermsOfServiceResponseDto> {
        return await this.apiClient.issuePostRequest(`${STAKING_BASE_PATH}/providers/${providerId}/approveTermsOfService`, {});
    }
}

