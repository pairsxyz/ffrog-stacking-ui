export type StakingContract = {
  version: "0.1.0";
  name: "staking_contract";
  instructions: [
    {
      name: "initialize";
      accounts: [
        {
          name: "programStateAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "rewardPoolVaultManager";
          isMut: true;
          isSigner: false;
        },
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "user";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "currentApy";
          type: "u64";
        },
        {
          name: "minStakeAmount";
          type: "u64";
        },
        {
          name: "minStakePeriod";
          type: "i64";
        }
      ];
    },
    {
      name: "stakeTokens";
      accounts: [
        {
          name: "user";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userPoolVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "mint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "programStateAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "getStakedInfo";
      accounts: [
        {
          name: "user";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userTokenAccount";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "unstakeAll";
      accounts: [
        {
          name: "user";
          isMut: true;
          isSigner: false;
        },
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        }
      ];
      args: [];
    },
    {
      name: "withdrawAllTokens";
      accounts: [
        {
          name: "user";
          isMut: true;
          isSigner: false;
        },
        {
          name: "programStateAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userPoolVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "rewardPoolVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "rewardPoolVaultManager";
          isMut: true;
          isSigner: false;
        },
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "stateBump";
          type: "u8";
        },
        {
          name: "rewardBump";
          type: "u8";
        }
      ];
    },
    {
      name: "mintTokensToCreator";
      accounts: [
        {
          name: "mint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "creatorTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "mintAuthority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        },
        {
          name: "bump";
          type: "u8";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "globalStateAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "currentApy";
            type: "u64";
          },
          {
            name: "minStakeAmount";
            type: "u64";
          },
          {
            name: "unstakeFreezeSeconds";
            type: "i64";
          }
        ];
      };
    },
    {
      name: "userAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "stakedAmount";
            type: "u64";
          },
          {
            name: "stakes";
            type: {
              vec: {
                defined: "Stake";
              };
            };
          },
          {
            name: "nextStakeId";
            type: "u64";
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "Stake";
      type: {
        kind: "struct";
        fields: [
          {
            name: "id";
            type: "u64";
          },
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "unstakeTime";
            type: "i64";
          },
          {
            name: "startTime";
            type: "i64";
          },
          {
            name: "apyAtStake";
            type: "u64";
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: "StakingPeriodNotOver";
      msg: "Staking period is not over yet";
    },
    {
      code: 6001;
      name: "MaxStakesExceeded";
      msg: "User has reached the maximum number of stakes";
    },
    {
      code: 6002;
      name: "JsonSerializationError";
      msg: "Failed to serialize data to JSON";
    },
    {
      code: 6003;
      name: "InvalidStakeIndex";
      msg: "Invalid stake index. Verify the stake exists with get_staked_info()";
    },
    {
      code: 6004;
      name: "Unauthorized";
      msg: "Unauthorized";
    },
    {
      code: 6005;
      name: "MinimumAmountNotReached";
      msg: "You haven't reached minimum staking amount";
    },
    {
      code: 6006;
      name: "AlreadyUnstaked";
      msg: "This stake has already been unstaked";
    },
    {
      code: 6007;
      name: "InvalidUserPoolVault";
      msg: "User pool vault address does not match the expected address";
    },
    {
      code: 6008;
      name: "InvalidRewardPoolVault";
      msg: "Reward pool vault address does not match the expected address";
    },
    {
      code: 6009;
      name: "ArithmeticError";
      msg: "Arithmetic error when calculating staking reward";
    }
  ];
};

export const IDL: StakingContract = {
  version: "0.1.0",
  name: "staking_contract",
  instructions: [
    {
      name: "initialize",
      accounts: [
        {
          name: "programStateAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rewardPoolVaultManager",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "user",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "currentApy",
          type: "u64",
        },
        {
          name: "minStakeAmount",
          type: "u64",
        },
        {
          name: "minStakePeriod",
          type: "i64",
        },
      ],
    },
    {
      name: "stakeTokens",
      accounts: [
        {
          name: "user",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userPoolVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "programStateAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "getStakedInfo",
      accounts: [
        {
          name: "user",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userTokenAccount",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "unstakeAll",
      accounts: [
        {
          name: "user",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
      ],
      args: [],
    },
    {
      name: "withdrawAllTokens",
      accounts: [
        {
          name: "user",
          isMut: true,
          isSigner: false,
        },
        {
          name: "programStateAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userPoolVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rewardPoolVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rewardPoolVaultManager",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "stateBump",
          type: "u8",
        },
        {
          name: "rewardBump",
          type: "u8",
        },
      ],
    },
    {
      name: "mintTokensToCreator",
      accounts: [
        {
          name: "mint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "creatorTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "mintAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
        {
          name: "bump",
          type: "u8",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "globalStateAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "currentApy",
            type: "u64",
          },
          {
            name: "minStakeAmount",
            type: "u64",
          },
          {
            name: "unstakeFreezeSeconds",
            type: "i64",
          },
        ],
      },
    },
    {
      name: "userAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "stakedAmount",
            type: "u64",
          },
          {
            name: "stakes",
            type: {
              vec: {
                defined: "Stake",
              },
            },
          },
          {
            name: "nextStakeId",
            type: "u64",
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "Stake",
      type: {
        kind: "struct",
        fields: [
          {
            name: "id",
            type: "u64",
          },
          {
            name: "amount",
            type: "u64",
          },
          {
            name: "unstakeTime",
            type: "i64",
          },
          {
            name: "startTime",
            type: "i64",
          },
          {
            name: "apyAtStake",
            type: "u64",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "StakingPeriodNotOver",
      msg: "Staking period is not over yet",
    },
    {
      code: 6001,
      name: "MaxStakesExceeded",
      msg: "User has reached the maximum number of stakes",
    },
    {
      code: 6002,
      name: "JsonSerializationError",
      msg: "Failed to serialize data to JSON",
    },
    {
      code: 6003,
      name: "InvalidStakeIndex",
      msg: "Invalid stake index. Verify the stake exists with get_staked_info()",
    },
    {
      code: 6004,
      name: "Unauthorized",
      msg: "Unauthorized",
    },
    {
      code: 6005,
      name: "MinimumAmountNotReached",
      msg: "You haven't reached minimum staking amount",
    },
    {
      code: 6006,
      name: "AlreadyUnstaked",
      msg: "This stake has already been unstaked",
    },
    {
      code: 6007,
      name: "InvalidUserPoolVault",
      msg: "User pool vault address does not match the expected address",
    },
    {
      code: 6008,
      name: "InvalidRewardPoolVault",
      msg: "Reward pool vault address does not match the expected address",
    },
    {
      code: 6009,
      name: "ArithmeticError",
      msg: "Arithmetic error when calculating staking reward",
    },
  ],
};
