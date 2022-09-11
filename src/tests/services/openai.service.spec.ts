import { expect } from 'chai';
import { _parseRepliesAboveModerationThreshold } from '../../services/openai.service';
import { mockModerationResults, mockTextList } from './openai.service.fixtures';

describe('OpenAI Service', () => {
  describe('_parseRepliesAboveModerationThreshold unit tests', () => {
    it('should return only replies above moderation threshold', async () => {
      const replies = _parseRepliesAboveModerationThreshold(
        mockTextList,
        mockModerationResults,
        50
      );
      expect(replies.length).to.equal(1);
      expect(replies[0]).to.deep.equal(mockTextList[0]);
    });
  });
});
